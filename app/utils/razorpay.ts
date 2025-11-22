"use client"

// Helper to fetch the key from the server
export const getRazorpayKey = async (): Promise<string> => {
  try {
    const response = await fetch("/api/get-razorpay-key")
    if (!response.ok) {
      throw new Error("Failed to fetch Razorpay key")
    }
    const data = await response.json()
    return data.key
  } catch (error) {
    console.error("Error fetching Razorpay key:", error)
    // Fallback for dev/test if API fails
    return "rzp_test_rJ93pnYKHvgyml"
  }
}

// Load Razorpay script
export const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true

    script.onload = () => {
      resolve(true)
    }

    script.onerror = () => {
      resolve(false)
    }

    document.body.appendChild(script)
  })
}

// Generate order ID
export const generateOrderId = async (amount: number): Promise<string> => {
  try {
    const response = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Failed to create order")
    }

    return data.orderId
  } catch (error) {
    console.error("Error generating order ID:", error)
    throw error
  }
}
