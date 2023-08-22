import { CHON_LOAI, selLoai, fetchFoodList, BASE_URL, showMessage, showThongTinForm, layThongTinTuForm } from "./controller-v2.js";

// render ds món ăn MỚI NHẤT từ server
fetchFoodList();

let deleteFood = id => {
  axios
    .delete(`${BASE_URL}/${id}`)
    .then(res => {
      console.log(res);
      // gọi lại api lấy danh sách mới nhất từ server và re-render
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
    .then(res => {
      console.log(res);
      $("#exampleModal").modal("hide");
      showMessage("Thêm món ăn thành công");
      selLoai.value = CHON_LOAI;
      fetchFoodList();
    })
    .catch(err => {});
};

window.addFood = addFood;

window.editFood = id => {
  document.getElementById("btnCapNhat").style.display = "block";
  document.getElementById("btnThemMon").style.display = "none";
  // mở modal để fill data từ server
  $("#exampleModal").modal("show");
  // chặn user edit mã món
  document.getElementById("foodID").disabled = true;
  document.getElementById("foodID").setAttribute("readonly", true);
  axios
    .get(`${BASE_URL}/${id}`)
    .then(res => {
      // show thông tin form
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
    .then(res => {
      console.log(res);
      $("#exampleModal").modal("hide");
      showMessage("Cập nhật thành công");
      fetchFoodList();
    })
    .catch(err => {
      console.log(err);
    });
};
