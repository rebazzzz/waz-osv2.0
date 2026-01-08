// Modal Functions

export function openModal(modalName) {
  this.elements.modalOverlay.classList.remove("hidden");

  // Hide all modals
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.add("hidden");
  });

  // Show requested modal
  document.getElementById(`${modalName}-modal`).classList.remove("hidden");
}

export function closeModal() {
  this.elements.modalOverlay.classList.add("hidden");
  document.querySelectorAll(".modal").forEach((modal) => {
    modal.classList.add("hidden");
  });
}

export function showNotification(message, type = "info") {
  const container = document.getElementById("notifications");
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  container.appendChild(notification);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease";
    setTimeout(() => notification.remove(), 300);
  }, 5000);
}

export function showMessageModal(
  message,
  title = "SYSTEM MESSAGE",
  onConfirm = null,
  onCancel = null
) {
  const modal = document.getElementById("message-modal");
  const titleEl = document.getElementById("message-title");
  const contentEl = document.getElementById("message-content");
  const closeBtn = document.getElementById("message-close-btn");

  titleEl.textContent = title;
  contentEl.textContent = message;

  // Show modal
  document.getElementById("modal-overlay").classList.remove("hidden");
  modal.classList.remove("hidden");

  // Handle close button
  const closeModal = () => {
    document.getElementById("modal-overlay").classList.add("hidden");
    modal.classList.add("hidden");
    if (onCancel) onCancel();
  };

  // Handle confirm button
  const handleConfirm = () => {
    closeModal();
    if (onConfirm) onConfirm();
  };

  // Handle cancel/close
  const handleCancel = () => {
    closeModal();
    if (onCancel) onCancel();
  };

  // Add event listeners
  closeBtn.addEventListener("click", handleConfirm);
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", handleCancel);
  });

  // Handle overlay click
  document.getElementById("modal-overlay").addEventListener("click", (e) => {
    if (e.target === document.getElementById("modal-overlay")) {
      handleCancel();
    }
  });

  // Focus the confirm button
  closeBtn.focus();
}