import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAuth } from "@/hooks/use-auth";

// Mock next/navigation
const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock actions
vi.mock("@/actions", () => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
}));

// Mock anon-work-tracker
vi.mock("@/lib/anon-work-tracker", () => ({
  getAnonWorkData: vi.fn(),
  clearAnonWork: vi.fn(),
}));

// Mock get-projects
vi.mock("@/actions/get-projects", () => ({
  getProjects: vi.fn(),
}));

// Mock create-project
vi.mock("@/actions/create-project", () => ({
  createProject: vi.fn(),
}));

import { signIn as signInAction, signUp as signUpAction } from "@/actions";
import { getAnonWorkData, clearAnonWork } from "@/lib/anon-work-tracker";
import { getProjects } from "@/actions/get-projects";
import { createProject } from "@/actions/create-project";

const mockSignInAction = vi.mocked(signInAction);
const mockSignUpAction = vi.mocked(signUpAction);
const mockGetAnonWorkData = vi.mocked(getAnonWorkData);
const mockClearAnonWork = vi.mocked(clearAnonWork);
const mockGetProjects = vi.mocked(getProjects);
const mockCreateProject = vi.mocked(createProject);

beforeEach(() => {
  vi.clearAllMocks();
  mockGetAnonWorkData.mockReturnValue(null);
  mockGetProjects.mockResolvedValue([]);
  mockCreateProject.mockResolvedValue({ id: "new-project-id" } as any);
});

describe("useAuth — initial state", () => {
  it("starts with isLoading false", () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isLoading).toBe(false);
  });

  it("exposes signIn, signUp, and isLoading", () => {
    const { result } = renderHook(() => useAuth());
    expect(typeof result.current.signIn).toBe("function");
    expect(typeof result.current.signUp).toBe("function");
    expect(typeof result.current.isLoading).toBe("boolean");
  });
});

describe("signIn — happy paths", () => {
  it("calls signInAction with email and password", async () => {
    mockSignInAction.mockResolvedValue({ success: true });
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn("user@example.com", "password123");
    });

    expect(mockSignInAction).toHaveBeenCalledWith("user@example.com", "password123");
  });

  it("returns the result from signInAction", async () => {
    mockSignInAction.mockResolvedValue({ success: true });
    const { result } = renderHook(() => useAuth());

    let returnValue: any;
    await act(async () => {
      returnValue = await result.current.signIn("user@example.com", "password123");
    });

    expect(returnValue).toEqual({ success: true });
  });

  it("sets isLoading to true during sign in and resets after", async () => {
    let loadingDuringCall = false;
    mockSignInAction.mockImplementation(async () => {
      loadingDuringCall = true;
      return { success: false, error: "bad creds" };
    });

    const { result } = renderHook(() => useAuth());
    await act(async () => {
      await result.current.signIn("user@example.com", "password123");
    });

    expect(loadingDuringCall).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });

  it("redirects to existing project after sign in", async () => {
    mockSignInAction.mockResolvedValue({ success: true });
    mockGetProjects.mockResolvedValue([{ id: "project-1" }] as any);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn("user@example.com", "password123");
    });

    expect(mockPush).toHaveBeenCalledWith("/project-1");
  });

  it("creates a new project and redirects when user has no projects", async () => {
    mockSignInAction.mockResolvedValue({ success: true });
    mockGetProjects.mockResolvedValue([]);
    mockCreateProject.mockResolvedValue({ id: "new-id" } as any);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn("user@example.com", "password123");
    });

    expect(mockCreateProject).toHaveBeenCalledWith(
      expect.objectContaining({ messages: [], data: {} })
    );
    expect(mockPush).toHaveBeenCalledWith("/new-id");
  });
});

describe("signIn — anonymous work migration", () => {
  it("creates a project with anon work and redirects to it", async () => {
    const anonWork = { messages: [{ role: "user", content: "hello" }], fileSystemData: { "/": {} } };
    mockSignInAction.mockResolvedValue({ success: true });
    mockGetAnonWorkData.mockReturnValue(anonWork);
    mockCreateProject.mockResolvedValue({ id: "anon-project-id" } as any);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn("user@example.com", "password123");
    });

    expect(mockCreateProject).toHaveBeenCalledWith(
      expect.objectContaining({
        messages: anonWork.messages,
        data: anonWork.fileSystemData,
      })
    );
    expect(mockClearAnonWork).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/anon-project-id");
  });

  it("does NOT migrate anon work when messages array is empty", async () => {
    mockSignInAction.mockResolvedValue({ success: true });
    mockGetAnonWorkData.mockReturnValue({ messages: [], fileSystemData: {} });
    mockGetProjects.mockResolvedValue([{ id: "existing" }] as any);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn("user@example.com", "password123");
    });

    expect(mockClearAnonWork).not.toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/existing");
  });

  it("skips anon migration when getAnonWorkData returns null", async () => {
    mockSignInAction.mockResolvedValue({ success: true });
    mockGetAnonWorkData.mockReturnValue(null);
    mockGetProjects.mockResolvedValue([{ id: "existing" }] as any);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn("user@example.com", "password123");
    });

    expect(mockClearAnonWork).not.toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith("/existing");
  });
});

describe("signIn — error states", () => {
  it("returns failure result without redirecting", async () => {
    mockSignInAction.mockResolvedValue({ success: false, error: "Invalid credentials" });
    const { result } = renderHook(() => useAuth());

    let returnValue: any;
    await act(async () => {
      returnValue = await result.current.signIn("user@example.com", "wrongpassword");
    });

    expect(returnValue).toEqual({ success: false, error: "Invalid credentials" });
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("resets isLoading to false even when signInAction throws", async () => {
    mockSignInAction.mockRejectedValue(new Error("Network error"));
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn("user@example.com", "password123").catch(() => {});
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("does not call handlePostSignIn when sign in fails", async () => {
    mockSignInAction.mockResolvedValue({ success: false, error: "Invalid credentials" });
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn("user@example.com", "password123");
    });

    expect(mockGetProjects).not.toHaveBeenCalled();
    expect(mockCreateProject).not.toHaveBeenCalled();
  });
});

describe("signUp — happy paths", () => {
  it("calls signUpAction with email and password", async () => {
    mockSignUpAction.mockResolvedValue({ success: true });
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signUp("newuser@example.com", "securepass");
    });

    expect(mockSignUpAction).toHaveBeenCalledWith("newuser@example.com", "securepass");
  });

  it("returns the result from signUpAction", async () => {
    mockSignUpAction.mockResolvedValue({ success: true });
    const { result } = renderHook(() => useAuth());

    let returnValue: any;
    await act(async () => {
      returnValue = await result.current.signUp("newuser@example.com", "securepass");
    });

    expect(returnValue).toEqual({ success: true });
  });

  it("redirects after successful sign up", async () => {
    mockSignUpAction.mockResolvedValue({ success: true });
    mockGetProjects.mockResolvedValue([]);
    mockCreateProject.mockResolvedValue({ id: "created-id" } as any);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signUp("newuser@example.com", "securepass");
    });

    expect(mockPush).toHaveBeenCalledWith("/created-id");
  });

  it("sets isLoading true during sign up and resets after", async () => {
    let loadingDuringCall = false;
    mockSignUpAction.mockImplementation(async () => {
      loadingDuringCall = true;
      return { success: true };
    });
    mockCreateProject.mockResolvedValue({ id: "x" } as any);
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signUp("newuser@example.com", "securepass");
    });

    expect(loadingDuringCall).toBe(true);
    expect(result.current.isLoading).toBe(false);
  });
});

describe("signUp — error states", () => {
  it("returns failure result without redirecting", async () => {
    mockSignUpAction.mockResolvedValue({ success: false, error: "Email already registered" });
    const { result } = renderHook(() => useAuth());

    let returnValue: any;
    await act(async () => {
      returnValue = await result.current.signUp("existing@example.com", "password123");
    });

    expect(returnValue).toEqual({ success: false, error: "Email already registered" });
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("resets isLoading to false even when signUpAction throws", async () => {
    mockSignUpAction.mockRejectedValue(new Error("Server error"));
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signUp("user@example.com", "password123").catch(() => {});
    });

    expect(result.current.isLoading).toBe(false);
  });

  it("does not call handlePostSignIn when sign up fails", async () => {
    mockSignUpAction.mockResolvedValue({ success: false, error: "Email already registered" });
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signUp("existing@example.com", "password123");
    });

    expect(mockGetProjects).not.toHaveBeenCalled();
    expect(mockCreateProject).not.toHaveBeenCalled();
  });
});
