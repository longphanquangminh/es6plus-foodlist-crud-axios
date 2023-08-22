import { Food } from "../models/Food.js";

export const BASE_URL = "https://64d6fb2a2a017531bc12e7e9.mockapi.io/food";
const MON_CHAY = true;
const CON_MON = true;
export const CHON_LOAI = "Chọn loại";
const ALL = "all";
const LOAI_1 = "loai1";

export let selLoai = document.getElementById("selLoai");

let renderFoodList = list => {
  let contentHTML = "";
  list.reverse().forEach(food => {
    let foodObj = new Food(food.ma, food.ten, food.loai, food.gia, food.khuyenMai, food.tinhTrang, food.hinhAnh, food.moTa);
    let { ma, ten, loai, gia, khuyenMai, tinhTrang, hinhAnh, moTa } = foodObj;
    let trString =
      /*html*/
      `
    <tr>
        <td>${ma}</td>
        <td>${ten}</td>
        <td>${loai == MON_CHAY ? "Chay" : "Mặn"}</td>
        <td>${gia}</td>
        <td>${khuyenMai}</td>
        <td>${foodObj.tinhGiaKm()}</td>
        <td>${tinhTrang == CON_MON ? "Còn" : "Hết"}</td>
        <td>
          <button onclick='editFood(${ma})' class="btn btn-info">Sửa</button>
          <button onclick='deleteFood(${ma})' class="btn btn-danger">Xóa</button>
        </td>
    </tr>
  `;
    contentHTML += trString;
  });
  document.getElementById("tbodyFood").innerHTML = contentHTML;
};

export let fetchFoodList = () => {
  axios({
    url: BASE_URL,
    method: "GET",
  })
    .then(res => {
      renderFoodList(res.data);
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

export let showMessage = (message, isSuccess = true) => {
  Toastify({
    text: message,
    className: "info",
    style: {
      background: isSuccess ? "green" : "red",
    },
  }).showToast();
};

export function layThongTinTuForm() {
  let ma = document.getElementById("foodID").value;
  let ten = document.getElementById("tenMon").value;
  let loai = document.getElementById("loai").value == "loai1";
  let gia = document.getElementById("giaMon").value * 1;
  let khuyenMai = document.getElementById("khuyenMai").value;
  let tinhTrang = document.getElementById("tinhTrang").value == "1";
  let hinhAnh = document.getElementById("hinhMon").value;
  let moTa = document.getElementById("moTa").value;
  return {
    ma,
    ten,
    loai,
    gia,
    khuyenMai,
    tinhTrang,
    hinhAnh,
    moTa,
    tinhGiaKm: function () {
      return this.price * ((100 - this.sale) / 100);
    },
  };
}

export let showThongTinForm = food => {
  // destructuring
  let { ma, ten, loai, gia, khuyenMai, tinhTrang, hinhAnh, moTa } = food;
  document.getElementById("foodID").value = ma;
  document.getElementById("tenMon").value = ten;
  document.getElementById("loai").value = loai == MON_CHAY ? "loai1" : "loai2";
  document.getElementById("giaMon").value = gia;
  document.getElementById("khuyenMai").value = khuyenMai;
  document.getElementById("tinhTrang").value = tinhTrang ? "1" : "0";
  document.getElementById("hinhMon").value = hinhAnh;
  document.getElementById("moTa").value = moTa;
};

selLoai.addEventListener("change", () => {
  let selectedValue = selLoai.value;
  console.log(selectedValue);
  if (selectedValue == ALL || selectedValue == "" || selectedValue == CHON_LOAI) {
    fetchFoodList();
  } else {
    selectedValue = selectedValue == LOAI_1 ? true : false;
    axios({
      url: `${BASE_URL}?loai=${selectedValue}`,
      method: "GET",
    })
      .then(res => {
        renderFoodList(res.data);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
});

function resetForm() {
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("btnThemMon").style.display = "block";
  document.getElementById("foodID").disabled = false;
  document.getElementById("foodID").removeAttribute("readonly");
  document.getElementById("foodID").value = "";
  document.getElementById("tenMon").value = "";
  document.getElementById("loai").value = "";
  document.getElementById("giaMon").value = "";
  document.getElementById("khuyenMai").value = "";
  document.getElementById("tinhTrang").value = "";
  document.getElementById("hinhMon").value = "";
  document.getElementById("moTa").value = "";
}

document.getElementById("btnThem").onclick = () => {
  resetForm();
};

document.getElementById("giaMon").type = "number";
