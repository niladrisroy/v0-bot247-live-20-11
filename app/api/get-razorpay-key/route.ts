import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Use the server-side environment variable (RAZORPAY_KEY_ID)
    // Fallback to test key if not set (for development)
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_rJ93pnYKHvgyml"

    if (!keyId) {
      return NextResponse.json({ error: "Razorpay key not configured" }, { status: 500 })
    }

    // Return the key to the client
    return NextResponse.json({ key: keyId })
  } catch (error) {
    console.error("Error fetching Razorpay key:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
