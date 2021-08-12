import { getAllCustomers, saveCustomerData } from "./dataSource.js";
import {
  displayCustomer,
  removeCustomers,
  toggleClass,
  validate,
} from "./utililies.js";

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

async function saveCustomer(event) {
  event.preventDefault();

  const customers = await customerArray();
  const { name, phone, email, country, city } = event.target;

  const isvalid = validate(
    name,
    "Please inter your full name",
    (value = "") => value.split(" ").length >= 2
  );
  if (isvalid) return;

  const isValidPhone = validate(
    phone,
    "Yow enter valid phone number",
    (value = "") => {
      // 1. inuu ku bilaabanayo +252
      if (!value.startsWith("+252")) return false;
      // 2. number ka waa inuu la eghay 13 xaraf.
      if (value.length != 13) return false;
      // 3. hubi inuu hormuud yahay.
      if (value[5] != 1) return false;

      return true;
    }
  );

  if (isValidPhone) return;

  const isValidEmail = validate(
    email,
    "Is already existing or invalid email...",
    (value = "") => {
      // is have . @
      if (value.indexOf(".") < 0 || value.indexOf("@") < 0) return false;
      // is already existing.
      const isExisting = customers
        .map((customer) => customer.email)
        .includes(value);
      if (isExisting) return false;
      return true;
    }
  );

  if (isValidEmail) return;

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
