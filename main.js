
var dsnv = new DanhSachNhanVien();
var validation = new Validation();

function getEle(id){
    return document.getElementById(id);
}

getLocalStorage();

getEle("btnThemNV").onclick = function (isAdd) {
    var _taiKhoan = getEle("tknv").value;
    var _tenNV = getEle("name").value;
    var _email = getEle("email").value;
    var _matKhau = getEle("password").value;
    var _ngayLam = getEle("datepicker").value;
    var _luongCB = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = getEle("gioLam").value;

    console.log (_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCB, _chucVu, _gioLam);

    var isValid = true;
    
     isValid &= validation.kiemTraRong(_taiKhoan, "divTKErr", "(*) Tên tài khoản không được rỗng" );
     validation.kiemTraDoDaiKiTu(_taiKhoan, "divTKErr", "(*) Độ dài kí tự từ 4-6", 4, 6);

    isValid &= validation.kiemTraRong(_tenNV, "divTenErr", "(*) Tên nhân viên không được rỗng" ) &&
     validation.kiemTraKiTuChuoi(_tenNV, "divTenErr", "(*) Tên nhân viên phải là chữ");

    isValid &= validation.kiemTraRong(_email, "divEmailErr", "(*) Email không được rỗng") &&
     validation.kiemTraEmail(_email, "divEmailErr", "(*) Email chưa đúng định dạng");

    isValid &= validation.kiemTraRong(_matKhau, "divMKErr", "(*) Mật Khẩu không được rỗng" ) &&
     validation.kiemTraDoDaiKiTu(_matKhau, "divMKErr", "(*) Độ dài kí tự từ 6-10", 6, 10) &&
     validation.kiemTraMatKhau(_matKhau, "divMKErr", "(*) Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt");

    isValid &= validation.kiemTraRong(_ngayLam, "divNLErr", "(*) Mật Khẩu không được rỗng" ) &&
     validation.kiemTraNgay(_ngayLam, "divNLErr", "(*) Ngày làm không đúng định dạng" );

    isValid &= validation.kiemTraRong(_luongCB, "divLCBErr", "(*) Lương cơ bản không được rỗng") &&
     validation.kiemTraKiTuSo(_luongCB, "divLCBErr", "(*) Lương cơ bản không không đúng",);

    isValid &= validation.kiemTraChucVu (chucvu,"divCVErr","vui lòng chọn chức vụ");

    isValid &= validation.kiemTraRong(_gioLam, "divGLErr", "(*) Giờ Làm không được rỗng" )
     validation.kiemTraKiTuSo(_gioLam, "divGLErr", "(*) Số giờ làm không không đúng",);

    // doi tuong nhan vien
   
    var nhanVien = new NhanVien (_taiKhoan, _tenNV, _email, _matKhau, _ngayLam, _luongCB, _chucVu, _gioLam);


    if (isValid) {
        nhanVien.tinhTongLuong();
        nhanVien.xepLoaiNV();
        dsnv.themNhanVien(nhanVien);
        taoBang(dsnv.list);
        setLocalStorage();
    };
}



function taoBang(arr){
    getEle("tableDanhSach").innerHTML = "";
    for (var i = 0; i <= arr.length; i++){
        var tagTR = document.createElement("tr");

        var tagTD_TaiKhoan = document.createElement("td");
        var tagTD_TenNV = document.createElement("td");
        var tagTD_Email = document.createElement("td");
        var tagTD_NgayLam = document.createElement("td")
        var tagTD_ChucVu = document.createElement("td");
        var tagTD_TongLuong = document.createElement("td");
        var tagTD_XepLoai = document.createElement("td");
        var tagTD_Button_Delete = document.createElement("td");

        tagTD_TaiKhoan.innerHTML = arr[i].taiKhoan;
        tagTD_TenNV.innerHTML = arr[i].tenNV;
        tagTD_Email.innerHTML = arr[i].email;
        tagTD_NgayLam.innerHTML = arr[i].ngayLam;
        tagTD_ChucVu.innerHTML = arr[i].chucVu;
        tagTD_TongLuong.innerHTML = arr[i].tongLuong;
        tagTD_XepLoai.innerHTML = arr[i].xepLoai;
        tagTD_Button_Delete.innerHTML = "<button class ='btn btn-danger'>Xóa</button>";

        tagTR.appendChild(tagTD_TaiKhoan);
        tagTR.appendChild(tagTD_TenNV);
        tagTR.appendChild(tagTD_Email);
        tagTR.appendChild(tagTD_NgayLam);
        tagTR.appendChild(tagTD_ChucVu);
        tagTR.appendChild(tagTD_TongLuong);
        tagTR.appendChild(tagTD_XepLoai);
        tagTR.appendChild(tagTD_Button_Delete);

        getEle("tableDanhSach").appendChild(tagTR);

    };

}

function setLocalStorage(){
    var arrString = JSON.stringify(dsnv.list);
    localStorage.setItem("DSNV", arrString);
}

function getLocalStorage(){
    if(localStorage.getItem("DSNV")){
   dsnv.list = JSON.parse(localStorage.getItem("DSNV"));
   taoBang(dsnv.list);
    }
}