import { describe, expect, it, vi } from "vitest";
import { useSettings } from "../src/useSettings";

describe("game settings", () => {
  it("should use generateSecret", () => {
    const secretGenerator = vi.fn().mockReturnValue("1234");

    const settings = useSettings({ base: "dec", length: 4, secretGenerator });

    expect(secretGenerator).toHaveBeenCalledWith(4, "dec");
    expect(settings.secret).toBe("1234");
  });
  it("should generate new secret each time regen called", () => {
    const secretGenerator = vi.fn().mockReturnValue("01");
    const settings = useSettings({ base: "bin", length: 2, secretGenerator });

    settings.regenSecret();
    settings.regenSecret();

    expect(secretGenerator).toHaveBeenCalledTimes(3);
    expect(secretGenerator).toHaveBeenLastCalledWith(2, "bin");
  });
  it("should regenerate secret on base change", () => {
    const secretGenerator = vi.fn().mockReturnValue("01");
    const settings = useSettings({ base: "bin", length: 2, secretGenerator });
    secretGenerator.mockClear();

    settings.setBase("hex");

    expect(secretGenerator).toHaveBeenCalledTimes(1);
    expect(secretGenerator).toHaveBeenCalledWith(2, "hex");
  });
  it("should regenerate secret on length change", () => {
    const secretGenerator = vi.fn().mockReturnValue("01");
    const settings = useSettings({ base: "bin", length: 2, secretGenerator });
    secretGenerator.mockClear();

    settings.setSecretLength(22);

    expect(secretGenerator).toHaveBeenCalledTimes(1);
    expect(secretGenerator).toHaveBeenCalledWith(22, "bin");
  });
});
