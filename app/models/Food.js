export class Food {
  constructor(_ma, _ten, _loai, _gia, _khuyenMai, _tinhTrang, _hinhAnh, _moTa) {
    this.ma = _ma;
    this.ten = _ten;
    this.loai = _loai;
    this.gia = _gia;
    this.khuyenMai = _khuyenMai;
    this.tinhTrang = _tinhTrang;
    this.hinhAnh = _hinhAnh;
    this.moTa = _moTa;
  }
  tinhGiaKm = function () {
    return (this.gia * ((100 - this.khuyenMai) / 100)).toFixed(2);
  };
}
