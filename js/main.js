import { getAllCustomers, saveCustomerData } from "./dataSource.js";
import { displayCustomer, toggleClass } from "./utililies.js";

const addBtn = document.querySelector("#add");
const [close] = document.querySelectorAll(".btn-close");
const [modelContainer] = document.querySelectorAll(".model-container");

const submit = document.querySelector("#regis-form");

// open and close model
addBtn.addEventListener("click", () => toggleClass(modelContainer));
close.addEventListener("click", () => toggleClass(modelContainer));
modelContainer.addEventListener("click", (e) => {
  if (e.target == e.currentTarget) toggleClass(modelContainer);
});

const displayCustomers = async () => {
  const customers = (await getAllCustomers()) || [];

  customers.forEach((cusData) => {
    displayCustomer(cusData);
  });
};

displayCustomers();

const saveCustomer = (event) => {
  event.preventDefault();
  const { name, phone, email, country, city } = event.target;

  const customer = {
    name: name.value,
    phone: phone.value,
    email: email.value,
    address: {
      country: country.value,
      city: city.value,
    },
  };

  saveCustomerData(customer).then((isSaved) => {
    if (isSaved) {
      // display saved customer
      displayCustomer(customer);
      // close form model
      toggleClass(modelContainer);
    }
  });

  //   console.log(customer);
};

submit.addEventListener("submit", saveCustomer);
