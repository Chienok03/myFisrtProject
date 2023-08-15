window.onload = function () {
    createEvents();
    new EmployeePage();
}

class EmployeePage {
    ListEmployee;
    constructor() {
        this.intEvents();
        this.loadData();
    }
    // Load dữ liệu cho bảng
    loadData() {
        try {
            //Gọi api thực hiện lấy dữ liệu
            fetch("https://cukcuk.manhnv.net/api/v1/Employees")
                .then(res => res.json)
                .then(data => {
                    debugger
                    this.ListEmployee = data;
                })

            //Build table
        } catch (error) {
            console.log(error);
        }
    }
    // Load dữ liệu cho bảng
    buildDataTable(data) {
        try {
            let table = document.getElementById("tbEmployeeList");
            let bodyTable = table.lastElementChild;
            //Tạo từng dòng dữ liệu tương ứng với đối tượng trong danh sách nhân viên
            //1.Duyệt từng đối tượng trong danh sách
            for (const item of data) {
                //2.Lấy ra các thông tin cần thiết
                const employeeCode = item.EmployeeCode;
                const employeeName = item.FullName;
                const gender = item.GenderName;
                const dob = item.DateOfBirth;
                const identityNumber = item.IdentityNumber;
                const positionName = item.PositionName;
                const departmentName = item.DepartmentName;
                const salary = item.Salary;
                //3.Build html thể hiện các thông tin trên table
                let trElement = document.createElement("tr");

                //checkbox
                let tdCheckbox = document.createElement("td");
                tdCheckbox.classList.add("text-align--left");
                let checkElement = document.createElement("input");
                checkElement.setAttribute("type", "checkbox");
                tdCheckbox.append(checkElement);
                trElement.append(tdCheckbox);
                //Mã nhân viên
                trElement.append(this.buildTdElement(employeeCode));

                //Họ và tên
                trElement.append(this.buildTdElement(employeeName));

                //Giới tính
                trElement.append(this.buildTdElement(gender));

                //Ngày sinh
                trElement.append(this.buildTdElement(dob));

                //Số CMND
                trElement.append(this.buildTdElement(identityNumber));

                //Chức danh
                trElement.append(this.buildTdElement(positionName));

                //Tên đơn vị
                trElement.append(this.buildTdElement(departmentName));

                //Mức lương
                trElement.append(this.buildTdElement(salary));

                //4.Đẩy vào table
                //Xác định vị trí table
                bodyTable.append(trElement);
            }

        } catch (error) {
            console.log(error);
        }
    }

    buildTdElement(textContent) {
        let tdElement = document.createElement("td");
        try {
            tdElement.classList.add("text-align--left");
            tdElement.textContent = textContent;
            return tdElement;
        } catch (error) {
            return tdElement;
        }
    }

    intEvents() {

    }
}

function createEvents() {
    try {
        //Hiển thị form thêm mới
        document.getElementById("add--btn").addEventListener("click", btnAddOnClick);

        //Ẩn form thêm mới
        const btnCancelList = document.querySelectorAll(".btnCancel");
        for (let i = 0; i < btnCancelList.length; i++) {
            btnCancelList[i].addEventListener("click", function () {
                document.getElementById("frmDetail").style.display = "none";
            })
        }

        //Hiện thông báo trong popup
        document.querySelectorAll(".input--required").forEach(function (el) {
            el.addEventListener("blur", onValidateFiedEmpty);
        });

        //Ẩn item
        const btnRemoveItem = document.querySelectorAll(".btnCancel");
        for (let i = 0; i < btnRemoveItem.length; i++) {
            btnRemoveItem[i].addEventListener("click", function () {
                document.getElementById("frmDetail").style.display = "none";
            })
        }

    } catch (error) {
        console.log(error);
    }
}




function btnAddOnClick() {
    document.getElementById("frmDetail").style.display = "block";
}

function onValidateFiedEmpty() {
    try {
        //Hiện viền đỏ
        //Lấy ra giá trị trong input
        let input = this;
        const value = input.value;
        // let elErrorInfo = this.nextElementSibling;
        //Kiểm tra giá trị 
        if (value.trim() == "".trim() || value == null || value == undefined) {
            console.log("Không được bỏ trống phần này!");
            //Gán border màu lỗi
            input.classList.add("input--error");

            //Hiển thị thông tin lỗi
            //Cách 1: Lấy thông tin element bị lỗi
            // elErrorInfo.style.display = "block";

            //Cách 2: Thêm phần hiển thi thông tin lỗi
            //Kiểm tra xem đã có element thông tin lỗi chưa
            let elErrorExits = this.nextElementSibling;
            if (elErrorExits == null) {
                //Tạo element thông tin lỗi:
                let elError = document.createElement("div");
                elError.classList.add("error--info");
                elError.textContent = "Không được để trống phần này!";
                //Sử dụng element cha của input và append:
                this.parentElement.append(elError);
            }


        } else {
            //Bỏ border màu lỗi
            input.classList.remove("input--error");
            // Ẩn thông tin lỗi
            // elErrorInfo.style.display = "none";

            let elErrorExits = this.nextElementSibling;
            if (elErrorExits != null) {
                elErrorExits.remove();
            }
            console.log("OK!");
        }
    } catch (error) {

    }

}


