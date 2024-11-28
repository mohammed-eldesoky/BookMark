var siteName = document.getElementById("siteName");
var urlName = document.getElementById("urlName");
var demoTable = document.getElementById("demoTable");
var list = [];

if (localStorage.getItem("book")) {
  list = JSON.parse(localStorage.getItem("book"));
  display(list);
}

function subInfo() {
  if (!nameValidation() || !urlValidation()) {
    alert("Please enter valid site name and URL.");
    return;
  }

  if (isDuplicate(siteName.value)) {
    alert("This site name already exists. Please enter a unique name.");
    return;
  }

  var bookObject = {
    sName: siteName.value,
    urName: urlName.value,
  };

  list.push(bookObject);
  localStorage.setItem("book", JSON.stringify(list));
  display(list);
  clear();
}

function clear() {
  siteName.value = null;
  urlName.value = null;
  siteName.classList.remove("is-valid", "is-invalid");
  urlName.classList.remove("is-valid", "is-invalid");
}

function display() {
  var box = "";
  for (var i = 0; i < list.length; i++) {
    box += `<tr>
          <td>${i + 1}</td>
          <td>${list[i].sName}</td>
            <td><button onclick="openLink('${
              list[i].urName
            }')" class="btn btn-visit"><i class="fa-solid fa-eye"></i> Visit</button></td>
          <td><button class="btn btn-delete" onclick="deleteFun(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>`;
  }
  demoTable.innerHTML = box;
}

function deleteFun(index) {
  list.splice(index, 1);
  localStorage.setItem("book", JSON.stringify(list));
  display(list);
}

function nameValidation() {
  var regex = /^\w{3,}(\s+\w+)*$/;
  if (regex.test(siteName.value)) {
    siteName.classList.add("is-valid");
    siteName.classList.remove("is-invalid");
    return true;
  } else {
    siteName.classList.add("is-invalid");
    siteName.classList.remove("is-valid");
    return false;
  }
}

function urlValidation() {
  var regex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-]*)*$/;
  if (regex.test(urlName.value)) {
    urlName.classList.add("is-valid");
    urlName.classList.remove("is-invalid");
    return true;
  } else {
    urlName.classList.add("is-invalid");
    urlName.classList.remove("is-valid");
    return false;
  }
}

function isDuplicate(name) {
  return list.some((item) => item.sName.toLowerCase() === name.toLowerCase());
}
siteName.addEventListener("input", nameValidation);
urlName.addEventListener("input", urlValidation);

function openLink(url) {
  {
    window.open(url.startsWith("http") ? url : `https://${url}`, "_blank");
  }
}
