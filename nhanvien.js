function NhanVien(_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCB, _chucVu, _gioLam){

    this.taiKhoan = _taiKhoan;
    this.tenNV = _tenNV;
    this.email = _email;
    this.matKhau = _matKhau;
    this.ngayLam = _ngayLam;
    this.luongCB = _luongCB;
    this.chucVu = _chucVu;
    this.gioLam = _gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhTongLuong = function(){
       if (this.chucVu === "Sếp"){
           this.tongLuong = parseFloat(this.luongCB)*3;
       } else if (this.chucVu === "Trưởng Phòng"){
        this.tongLuong = parseFloat(this.luongCB)*2;
       } else {this.tongLuong = parseFloat(this.luongCB);}

        return this.tongLuong;
    };

    this.xepLoaiNV = function (){
        if (this.gioLam >= 192){
            this.xepLoai = "NV Xuất sắc";
        } else if (this.gioLam >= 176){
            this.xepLoai = "NV Giỏi";
        } else if (this.gioLam  >= 160){
            this.xepLoai = "NV Khá";
        } else { 
            this.xepLoai = "NV Trung bình";
        }
        return this.xepLoai;
    };
}