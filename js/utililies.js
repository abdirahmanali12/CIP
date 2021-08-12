export const toggleClass = (element, className = "hide") => {
  const classes = [...element.classList];
  if (classes.indexOf(className) > -1) element.classList.remove(className);
  else element.classList.add(className);
};

const customerInfo = (customer = {}) => {
  const { name, phone, id } = customer;

  const cName = name
    .split(" ")
    .filter((a, index) => index < 2)
    .reduce((a, b) => a + " " + b);

  const div = document.createElement("div");
  div.classList.add("customer");
  div.innerHTML = `<header class="customer-info">
            <div class="image">
              <i class="fas fa-user-circle"></i>
            </div>
            <div class="c-title">
              <h1>${cName}</h1>
              <span>${phone}</span>
            </div>
          </header>
          <button data-id="${id}" class="btn primary">Profile</button>
        `;
  return div;
};

export const displayCustomer = (customerData = {}) => {
  const customerContainer = document.querySelector(".customers-container");
  const counter = customerContainer.previousElementSibling.lastElementChild;
  const customer = customerInfo(customerData);
  customerContainer.append(customer);
  counter.textContent = `${customerContainer.childElementCount} Of Current Customers`;
};

export const removeCustomers = () => {
  document.querySelector(".customers-container").innerHTML = "";
};

// form validater
export const validate = (
  node,
  messageInfo = "Please enter what we neaded",
  predicate = (value) => false
) => {
  const isvalid = predicate(node.value.trim());
  if (isvalid) return false;
  const parentElement = node.parentElement;
  const message = document.createElement("small");
  message.textContent = messageInfo;
  message.style.color = "red";
  message.style.fontSize = "12px";
  node.style.border = "1px solid red";
  parentElement.appendChild(message);

  setTimeout(() => {
    node.style.border = "none";
    parentElement.removeChild(message);
  }, 5000);

  return true;
};
