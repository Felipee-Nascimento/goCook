document.addEventListener("DOMContentLoaded", function () {
  const modalContainer = document.getElementById("modal-container");
  const nameElement = document.getElementById("name");
  const emailElement = document.getElementById("email");
  const nameInput = document.getElementById("name-input");
  const currentPasswordInput = document.getElementById("current-password");
  const newPasswordInput = document.getElementById("new-password");

  let formData = {
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  };

  async function fetchUserData() {
    const response = await fetch("http://localhost:3000/user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    formData = { ...formData, name: data.name, email: data.email };
    nameElement.textContent = data.name;
    emailElement.textContent = data.email;
  }

  function handleEditClick() {
    modalContainer.style.display = "flex";
    nameInput.value = formData.name;
    currentPasswordInput.value = "";
    newPasswordInput.value = "";
  }

  function handleCloseModal() {
    modalContainer.style.display = "none";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const updatedData = {
      name: nameInput.value,
      currentPassword: currentPasswordInput.value,
      newPassword: newPasswordInput.value,
    };

    const response = await fetch("http://localhost:3000/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      alert(errorData.message);
    } else {
      alert("Informações atualizadas com sucesso!");
      handleCloseModal();
    }
  }

  document.getElementById("edit-form").addEventListener("submit", handleSubmit);
  document
    .querySelector(".edit-button")
    .addEventListener("click", handleEditClick);
  document
    .querySelector(".close-button")
    .addEventListener("click", handleCloseModal);
});
