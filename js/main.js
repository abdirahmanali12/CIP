import { getAllCustomers, saveCustomerData } from "./dataSource.js";
import { displayCustomer, removeCustomers, toggleClass } from "./utililies.js";

const customerArray = async () => (await getAllCustomers()) || [];

const addBtn = document.querySelector("#add");
const [close] = document.querySelectorAll(".btn-close");
const [modelContainer] = document.querySelectorAll(".model-container");
const resgisForm = document.querySelector("#regis-form");
const [searchingForm] = document.querySelectorAll(".search-con");
const [searchField] = document.getElementsByName("search");

// open and close model
addBtn.addEventListener("click", () => toggleClass(modelContainer));
close.addEventListener("click", () => toggleClass(modelContainer));
modelContainer.addEventListener(
  "click",
  (e) => e.target == e.currentTarget && toggleClass(modelContainer)
);
resgisForm.addEventListener("submit", saveCustomer);
searchingForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const {
    search: { value },
  } = e.target;

  searchCustomer(value);
});

searchField.addEventListener("keyup", (e) => {
  searchCustomer(e.target.value);
});

const searchCustomer = async (name) => {
  removeCustomers();
  const customers = await customerArray();
  displayCustomers(
    customers.filter((customer) =>
      customer.name.toLowerCase().includes(name.toLowerCase())
    )
  );
};

const displayCustomers = (customers = []) => {
  customers.forEach((cusData) => {
    displayCustomer(cusData);
  });
};

displayCustomers(await customerArray());

function saveCustomer(event) {
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
}
