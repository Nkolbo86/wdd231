document.addEventListener("DOMContentLoaded", () => {
    // Open modal on link click
    document.querySelectorAll('[data-modal]').forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const modalId = link.getAttribute("data-modal");
        const modal = document.getElementById(modalId);
        if (modal) modal.showModal();
      });
    });
  
    // Close modal on button click
    document.querySelectorAll(".close-modal").forEach(button => {
      button.addEventListener("click", () => {
        const dialog = button.closest("dialog");
        if (dialog) dialog.close();
      });
    });
  });
  