interface Message {
  role: "user" | "assistant"
  content: string
}

interface Conversation {
  id: string
  created_at: string
  messages: Message[]
}

interface ConversationData {
  date: string
  conversations: Conversation[]
}

/**
 * Export conversations to JSON format
 */
export function exportToJSON(
  conversationData: ConversationData,
  chatbotName: string,
  filename?: string
): void {
  const exportData = {
    chatbot: chatbotName,
    exportDate: new Date().toISOString(),
    conversationDate: conversationData.date,
    totalConversations: conversationData.conversations.length,
    conversations: conversationData.conversations.map((conv) => ({
      id: conv.id,
      timestamp: conv.created_at,
      messageCount: conv.messages.length,
      messages: conv.messages,
    })),
  }

  const dataStr = JSON.stringify(exportData, null, 2)
  downloadFile(dataStr, filename || `conversations-${conversationData.date}.json`, "application/json")
}

/**
 * Export conversations to CSV format
 */
export function exportToCSV(
  conversationData: ConversationData,
  chatbotName: string,
  filename?: string
): void {
  let csvContent = "Chatbot,Export Date,Conversation Date\n"
  csvContent += `"${chatbotName}","${new Date().toISOString()}","${conversationData.date}"\n\n`
  csvContent += "Conversation ID,Timestamp,Message Role,Message Content\n"

  conversationData.conversations.forEach((conv) => {
    conv.messages.forEach((msg, index) => {
      const conversationId = index === 0 ? conv.id : ""
      const timestamp = index === 0 ? conv.created_at : ""
      const escapedContent = `"${msg.content.replace(/"/g, '""')}"` // Escape quotes for CSV
      csvContent += `"${conversationId}","${timestamp}","${msg.role}",${escapedContent}\n`
    })
  })

  downloadFile(csvContent, filename || `conversations-${conversationData.date}.csv`, "text/csv")
}

/**
 * Export conversations to plain text format - formatted like chat display
 */
export function exportToTXT(
  conversationData: ConversationData,
  chatbotName: string,
  filename?: string
): void {
  let txtContent = "═".repeat(100) + "\n"
  txtContent += `${chatbotName.toUpperCase()} - CONVERSATION EXPORT\n`
  txtContent += `Date: ${new Date(conversationData.date).toLocaleDateString()}\n`
  txtContent += `Export Generated: ${new Date().toLocaleString()}\n`
  txtContent += `Total Conversations: ${conversationData.conversations.length}\n`
  txtContent += "═".repeat(100) + "\n\n"

  conversationData.conversations.forEach((conv, convIndex) => {
    txtContent += `\n${"─".repeat(100)}\n`
    txtContent += `CONVERSATION ${convIndex + 1}\n`
    txtContent += `Time: ${new Date(conv.created_at).toLocaleString()}\n`
    txtContent += `${"─".repeat(100)}\n\n`

    conv.messages.forEach((msg) => {
      if (msg.role === "assistant") {
        txtContent += `${chatbotName}:\n`
        txtContent += `${msg.content}\n\n`
      } else {
        txtContent += `You:\n`
        txtContent += `${msg.content}\n\n`
      }
    })
  })

  txtContent += "\n" + "═".repeat(100) + "\n"
  txtContent += `End of Export\n`
  txtContent += "═".repeat(100) + "\n"

  downloadFile(txtContent, filename || `conversations-${conversationData.date}.txt`, "text/plain")
}

/**
 * Export all conversations (from all dates) to a single JSON file
 */
export function exportAllConversationsToJSON(
  allConversationsByDate: Array<ConversationData>,
  chatbotName: string,
  filename?: string
): void {
  const exportData = {
    chatbot: chatbotName,
    exportDate: new Date().toISOString(),
    totalDates: allConversationsByDate.length,
    totalConversations: allConversationsByDate.reduce((sum, cd) => sum + cd.conversations.length, 0),
    dateGroups: allConversationsByDate.map((cd) => ({
      date: cd.date,
      conversationCount: cd.conversations.length,
      conversations: cd.conversations.map((conv) => ({
        id: conv.id,
        timestamp: conv.created_at,
        messageCount: conv.messages.length,
        messages: conv.messages,
      })),
    })),
  }

  const dataStr = JSON.stringify(exportData, null, 2)
  downloadFile(dataStr, filename || `all-conversations-${new Date().toISOString().split("T")[0]}.json`, "application/json")
}

/**
 * Export all conversations to text format - formatted like chat display
 */
export function exportAllConversationsToTXT(
  allConversationsByDate: Array<ConversationData>,
  chatbotName: string,
  filename?: string
): void {
  let txtContent = "═".repeat(100) + "\n"
  txtContent += `${chatbotName.toUpperCase()} - COMPLETE CONVERSATION HISTORY\n`
  txtContent += `Export Generated: ${new Date().toLocaleString()}\n`
  txtContent += `Total Dates: ${allConversationsByDate.length}\n`
  txtContent += `Total Conversations: ${allConversationsByDate.reduce((sum, cd) => sum + cd.conversations.length, 0)}\n`
  txtContent += "═".repeat(100) + "\n\n"

  allConversationsByDate.forEach((dateGroup, dateIndex) => {
    txtContent += `\n${"▓".repeat(100)}\n`
    txtContent += `DATE ${dateIndex + 1}: ${new Date(dateGroup.date).toLocaleDateString()}\n`
    txtContent += `Conversations: ${dateGroup.conversations.length}\n`
    txtContent += `${"▓".repeat(100)}\n\n`

    dateGroup.conversations.forEach((conv, convIndex) => {
      txtContent += `${"─".repeat(100)}\n`
      txtContent += `CONVERSATION ${convIndex + 1}\n`
      txtContent += `Time: ${new Date(conv.created_at).toLocaleString()}\n`
      txtContent += `${"─".repeat(100)}\n\n`

      conv.messages.forEach((msg) => {
        if (msg.role === "assistant") {
          txtContent += `${chatbotName}:\n`
          txtContent += `${msg.content}\n\n`
        } else {
          txtContent += `You:\n`
          txtContent += `${msg.content}\n\n`
        }
      })
    })
  })

  txtContent += "\n" + "═".repeat(100) + "\n"
  txtContent += `End of Complete History\n`
  txtContent += "═".repeat(100) + "\n"

  downloadFile(txtContent, filename || `all-conversations-${new Date().toISOString().split("T")[0]}.txt`, "text/plain")
}

/**
 * Helper function to trigger file download
 */
function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
