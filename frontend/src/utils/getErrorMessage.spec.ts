import { beforeEach, describe, expect, it, vi } from "vitest"
import axios from "axios"

import { getErrorMessage } from "./getErrorMessage"

describe("getErrorMessage", () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it("returns axios response message", () => {
    const error = {
      response: {
        data: {
          message: "Product not found",
        },
      },
      message: "Network Error",
    }

    vi.spyOn(axios, "isAxiosError").mockReturnValue(true)

    expect(getErrorMessage(error)).toBe("Product not found")
  })

  it("returns axios error message when response message does not exist", () => {
    const error = {
      message: "Network Error",
    }

    vi.spyOn(axios, "isAxiosError").mockReturnValue(true)

    expect(getErrorMessage(error)).toBe("Network Error")
  })

  it("returns axios fallback message", () => {
    const error = {}

    vi.spyOn(axios, "isAxiosError").mockReturnValue(true)

    expect(getErrorMessage(error)).toBe(
      "Unexpected server error."
    )
  })

  it("returns native Error message", () => {
    vi.spyOn(axios, "isAxiosError").mockReturnValue(false)

    const error = new Error("Something exploded")

    expect(getErrorMessage(error)).toBe(
      "Something exploded"
    )
  })

  it("returns fallback for unknown value", () => {
    vi.spyOn(axios, "isAxiosError").mockReturnValue(false)

    expect(getErrorMessage("error")).toBe(
      "Something went wrong."
    )

    expect(getErrorMessage(404)).toBe(
      "Something went wrong."
    )

    expect(getErrorMessage(null)).toBe(
      "Something went wrong."
    )

    expect(getErrorMessage(undefined)).toBe(
      "Something went wrong."
    )

    expect(getErrorMessage({})).toBe(
      "Something went wrong."
    )
  })
})