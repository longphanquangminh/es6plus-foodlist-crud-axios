import { CHON_LOAI, selLoai, fetchFoodList, BASE_URL, showMessage, showThongTinForm, layThongTinTuForm } from "./controller.js";

fetchFoodList();

let deleteFood = id => {
  axios
    .delete(`${BASE_URL}/${id}`)
    .then(() => {
      selLoai.value = CHON_LOAI;
      fetchFoodList();
      showMessage("Xóa thành công");
    })
    .catch(err => {
      console.log(err);
      showMessage("Đã có lỗi xảy ra", false);
    });
};

window.deleteFood = deleteFood;

let addFood = () => {
  let data = layThongTinTuForm();
  axios
    .post(BASE_URL, data)
    .then(() => {
      $("#exampleModal").modal("hide");
      showMessage("Thêm món ăn thành công");
      selLoai.value = CHON_LOAI;
      fetchFoodList();
    })
    .catch(err => {
      console.log(err);
    });
};

window.addFood = addFood;

window.editFood = id => {
  document.getElementById("btnCapNhat").style.display = "block";
  document.getElementById("btnThemMon").style.display = "none";
  $("#exampleModal").modal("show");
  document.getElementById("foodID").disabled = true;
  document.getElementById("foodID").setAttribute("readonly", true);
  axios
    .get(`${BASE_URL}/${id}`)
    .then(res => {
      showThongTinForm(res.data);
    })
    .catch(err => {
      console.log(err);
    });
};

window.updateFood = () => {
  let data = layThongTinTuForm();
  axios
    .put(`${BASE_URL}/${data.ma}`, data)
    .then(() => {
      $("#exampleModal").modal("hide");
      showMessage("Cập nhật thành công");
      selLoai.value = CHON_LOAI;
      fetchFoodList();
    })
    .catch(err => {
      console.log(err);
    });
};

document.addEventListener("contextmenu", e => {
  e.preventDefault();
});

document.addEventListener("keydown", e => {
  if (e.key === "F12") {
    e.preventDefault();
  }
});

document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }
});
