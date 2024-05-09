using Back.DataAccess;
using Back.Helpers;
using Back.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Net;
using System.Text.RegularExpressions;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using Microsoft.AspNetCore.Authorization;

namespace Back.Controllers
{
    //Sinh Vien
    [Route("api/[controller]")]
    [ApiController]
    public class SinhViensController : ControllerBase
    {
        private IUnitOfWork context;
        public SinhViensController(IUnitOfWork context)
        {
            this.context = context;
        }
        //hien thi toan bo sinh vien
        [Authorize(Roles = "admin")]
        [HttpGet("[action]")]
        public async Task<IEnumerable<SinhVien>> Get()
        {
            return await context.SinhVienRepository.GetAsync();
        }

        //hien thi danh sach sinh vien theo masv
        [Authorize(Roles = "admin")]
        [HttpGet("[action]/partial/{partialMaSV}")]
        public async Task<IEnumerable<SinhVien>> GetByPartialMaSV([FromRoute] string partialMaSV)
        {
            var sinhViens = await context.SinhVienRepository.GetAsync(sv => EF.Functions.Like(sv.maSV, $"%{partialMaSV}%"));
            return sinhViens;
        }

        //hien thi sinh vien theo masv
        [Authorize(Roles = "admin,student")]
        [HttpGet("[action]/{maSV}")]
        public async Task<SinhVien> Get([FromRoute] string maSV)
        {
            return await context.SinhVienRepository.GetSingleAsync(maSV);
        }

        //them sinh vien
        [Authorize(Roles = "admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] SinhVien sinhvien)
        {
            try
            {
                await context.SinhVienRepository.InsertAsync(sinhvien);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //sua sinh vien
        [Authorize(Roles = "admin,student")]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] SinhVien sinhvien)
        {
            try
            {
                context.SinhVienRepository.Update(sinhvien);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //xoa sinh vien
        [Authorize(Roles = "admin")]
        [HttpDelete("[action]/{maSV}")]
        public async Task<ActionResult> Delete(string maSV)
        {
            try
            {
                await context.SinhVienRepository.DeleteAsync(maSV);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Import excel
        [Authorize(Roles = "admin")]
        [HttpPost("import")]
        public async Task<IActionResult> ImportSinhVienData([FromBody] List<SinhVien> sinhVienData)
        {
            try
            {
                await context.SinhVienRepository.ImportSinhVienDataAsync(sinhVienData);

                return Ok(new { Massage = "Thêm sinh viên thành công!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Import thất bại: {ex.Message}");
            }
        }
    }

    //Giao Vien
    [Route("api/[controller]")]
    [ApiController]
    public class GiaoViensController : ControllerBase
    {
        private IUnitOfWork context;
        public GiaoViensController(IUnitOfWork context)
        {
            this.context = context;
        }

        //Hien thi toan bo giao vien
        [Authorize(Roles = "admin")]
        [HttpGet("[action]")]
        public async Task<IEnumerable<GiaoVien>> Get()
        {
            return await context.GiaoVienRepository.GetAsync();
        }

        //Them giao vien 
        [Authorize(Roles = "admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] GiaoVien giaovien)
        {
            try
            {
                await context.GiaoVienRepository.InsertAsync(giaovien);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Hien thi giao vien theo maGV 
        [Authorize(Roles = "admin,teacher")]
        [HttpGet("[action]/{maGV}")]
        public async Task<GiaoVien> Get([FromRoute] string maGV)
        {
            return await context.GiaoVienRepository.GetSingleAsync(maGV);
        }

        //Sua giao vien
        [Authorize(Roles = "admin,teacher")]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] GiaoVien giaovien)
        {
            try
            {
                context.GiaoVienRepository.Update(giaovien);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Xoa giao vien 
        [Authorize(Roles = "admin")]
        [HttpDelete("[action]/{maGV}")]
        public async Task<ActionResult> Delete(string maGV)
        {
            try
            {
                await context.GiaoVienRepository.DeleteAsync(maGV);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Tim Giao Vien theo maGV 
        [Authorize(Roles = "admin")]
        [HttpGet("[action]/partial/{partialMaGV}")]
        public async Task<IEnumerable<GiaoVien>> GetByPartialMaGV([FromRoute] string partialMaGV)
        {
            var giaoViens = await context.GiaoVienRepository.GetAsync(gv => EF.Functions.Like(gv.maGV, $"%{partialMaGV}%"));
            return giaoViens;
        }

        //Import excel
        [Authorize(Roles = "admin")]
        [HttpPost("import")]
        public async Task<IActionResult> ImportGiaoVienData([FromBody] List<GiaoVien> giaoVienData)
        {
            try
            {
                await context.GiaoVienRepository.ImportGiaoVienDataAsync(giaoVienData);

                return Ok(new { Massage = "Thêm giáo viên thành công!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Import thất bại: {ex.Message}");
            }
        }

    }

    //User Form
    [Route("api/[controller]")]
    [ApiController]
    public class UserFormsController : ControllerBase
    {
        private IUnitOfWork context;
        public UserFormsController(IUnitOfWork context)
        {
            this.context = context;
        }
        // Xem
        [Authorize(Roles = "admin")]
        [HttpGet("[action]")]
        public async Task<IEnumerable<UserForm>> Get()
        {
            return await context.UserFormRepository.GetAsync();
        }

        //Xoa
        [Authorize(Roles = "admin")]
        [HttpDelete("[action]/{email}")]
        public async Task<ActionResult> Delete(string email)
        {
            try
            {
                await context.UserFormRepository.DeleteAsync2(userForm => userForm.email == email);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("[action]/{id}")]
        public async Task<ActionResult> DeleteID(int id)
        {
            try
            {
                await context.UserFormRepository.DeleteAsync2(userForm => userForm.id == id);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        
        //Kiem tra tk mk
        [HttpGet("[action]/{email}/{password}")]
        public async Task<ActionResult<bool>> CheckLogin([FromRoute] string email, [FromRoute] string password)
        {
            try
            {
                // Sử dụng repository để kiểm tra tồn tại
                var existingUserForm = await context.UserFormRepository.GetCredentialsAsync(email, password);

                return Ok(existingUserForm != null);
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        
        //Kiem tra tk mk (mk đã băm)
        [HttpGet("[action]/{email}/{password}")]
        public async Task<ActionResult<bool>> CheckLogin2([FromRoute] string email, [FromRoute] string password)
        {
            try
            {
                var checkEmail = await context.UserFormRepository.GetUserByEmailAsync(email);
                // Sử dụng repository để kiểm tra tồn tại
                if (checkEmail == null)
                    return Ok(false);
                if (!PasswordHasher.VerifyPassword(password, checkEmail.password))
                {
                    return Ok(false);
                }
                return Ok(true);
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Kiem tra tk mk va phong chong sql injection
        [HttpPost("Login")]
        public async Task<IActionResult> Login(UserForm userform)
        {
            if (userform == null)
                return BadRequest();

            var checkEmail = await context.UserFormRepository.GetUserByEmailAsync(userform.email);

            if (checkEmail == null)
                return NotFound(new { Message = "Tài khoản không tồn tại" });

            if (!PasswordHasher.VerifySHA256Hash(userform.password, checkEmail.password))
            {
                return BadRequest(new { Message = "Mật khẩu không đúng" });
            }

            string Token = CreateJwt(checkEmail); 
            


            return Ok(new
            {
                Token ,
                Massage = "Đăng nhập thành công"
            }) ;
        }

        //Them
        [Authorize(Roles = "admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] UserForm userform)
        {
            try
            {
                userform.password = PasswordHasher.HashPassword(userform.password);
                await context.UserFormRepository.InsertAsync(userform);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Sua
        [Authorize(Roles = "admin,teacher,student")]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] UserForm userform)
        {
            try
            {
                var existingUserForm = await context.UserFormRepository.GetUserByEmailAsync(userform.email);

                if (existingUserForm == null)
                {
                    return NotFound(); 
                }
                existingUserForm.name = userform.name;
                context.UserFormRepository.Update(existingUserForm);
                await context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }


        [Authorize(Roles = "admin,teacher,student")]
        [HttpPut("update/{email}")]
        public async Task<IActionResult> UpdateUserForm(string email, [FromBody] UserForm updateModel)
        {
            // Kiểm tra độ mạnh mật khẩu
            var passMessage = PasswordStrength.CheckPasswordStrength(updateModel.password);
            if (!string.IsNullOrEmpty(passMessage))
            {
                return BadRequest(new { Message = passMessage.ToString() });
            }

            // Kiểm tra email và thực hiện cập nhật thông tin
            var success = await context.UserFormRepository.UpdateUserFormAsync(email, userForm =>
            {
                // Áp dụng các thay đổi từ updateModel vào userForm
                userForm.password = PasswordHasher.HashPassword(updateModel.password);
                
            });

            if (success)
            {
                return Ok(new {Massage = "Đổi mật khẩu thành công"});
            }
            else
            {
                return NotFound("UserForm not found.");
            }
        }

        private string CreateJwt(UserForm user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role, user.user_type),
                new Claim(ClaimTypes.Email, user.email),
                new Claim(ClaimTypes.Name,$"{user.name}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(2),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

    }

    //Mon Hoc 
    [Route("api/[controller]")]
    [ApiController]
    public class MonHocsController : ControllerBase
    {
        private IUnitOfWork context;
        public MonHocsController(IUnitOfWork context)
        {
            this.context = context;
        }
        //Xem 
        [HttpGet("[action]")]
        public async Task<IEnumerable<MonHoc>> Get()
        {
            return await context.MonHocRepository.GetAsync();
        }

        //Them 
        [Authorize(Roles = "admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] MonHoc monhoc)
        {
            try
            {
                await context.MonHocRepository.InsertAsync(monhoc);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Xem theo maMH
        [HttpGet("[action]/{maMH}")]
        public async Task<MonHoc> Get([FromRoute] string maMH)
        {
            return await context.MonHocRepository.GetSingleAsync(maMH);
        }
        //Kiem tra maMH da ton tai chua 
        [HttpGet("[action]/{maMH}")]
        public async Task<ActionResult<bool>> CheckIfMaMHTExists([FromRoute] string maMH)
        {
            try
            {
                // Sử dụng repository để kiểm tra tồn tại
                var existingMonHoc = await context.MonHocRepository.GetSingleAsync(maMH);

                // Nếu môn học tồn tại, trả về true, ngược lại trả về false
                return Ok(existingMonHoc != null);
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        //Sua 
        [Authorize(Roles = "admin")]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] MonHoc monhoc)
        {
            try
            {
                context.MonHocRepository.Update(monhoc);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        //Xoa
        [Authorize(Roles = "admin")]
        [HttpDelete("[action]/{maMH}")]
        public async Task<ActionResult> Delete(string maMH)
        {
            try
            {
                await context.MonHocRepository.DeleteAsync(maMH);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        [HttpGet("[action]/partial/{partialMaMH}")]
        public async Task<IEnumerable<MonHoc>> GetByPartialMaMH([FromRoute] string partialMaMH)
        {
            var monHocs = await context.MonHocRepository.GetAsync(sv => EF.Functions.Like(sv.maMH, $"%{partialMaMH}%"));
            return monHocs;
        }
    }

    //Lop Hoc Phan
    [Route("api/[controller]")]
    [ApiController]
    public class LopHocPhansController : ControllerBase
    {
        private IUnitOfWork context;
        public LopHocPhansController(IUnitOfWork context)
        {
            this.context = context;
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<LopHocPhan>> Get()
        {
            return await context.LopHocPhanRepository.GetAsync();
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfo()
        {
            return await context.LopHocPhanRepository.GetLopHocPhanMonHocInfoAsync();
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoWithCount()
        {
            return await context.LopHocPhanRepository.GetLopHocPhanMonHocInfoWithCountAsync();
        }
        [HttpGet("[action]/{maLHP}")]
        public async Task<LopHocPhan> Get([FromRoute] string maLHP)
        {
            return await context.LopHocPhanRepository.GetSingleAsync(maLHP);
        }

        [HttpGet("[action]/{maLHP}")]
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanDetails([FromRoute] string maLHP)
        {
            return await context.LopHocPhanRepository.GetLopHocPhanDetailsAsync(maLHP);
        }

        [HttpGet("[action]/{maLHP}")]
        public async Task<IEnumerable<ChiTietLHP>> GetKetQuaDetails([FromRoute] string maLHP)
        {
            return await context.LopHocPhanRepository.GetKetQuaDetailsAsync(maLHP);
        }

        [Authorize(Roles = "admin")]
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] LopHocPhan lophocphan)
        {
            try
            {
                await context.LopHocPhanRepository.InsertAsync(lophocphan);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [Authorize(Roles = "admin")]
        [HttpDelete("[action]/{maLHP}")]
        public async Task<ActionResult> Delete(string maLHP)
        {
            try
            {
                await context.LopHocPhanRepository.DeleteAsync(maLHP);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpGet("[action]/partial/{partialMaLHP}")]
        public async Task<IEnumerable<LopHocPhan>> GetByPartialMaGV([FromRoute] string partialMaLHP)
        {
            var lopHocPhans = await context.LopHocPhanRepository.GetAsync(lhp => EF.Functions.Like(lhp.maLHP, $"%{partialMaLHP}%"));
            return lopHocPhans;
        }

        [HttpGet("[action]/{maGV}/{thu}/{gio}")]
        public async Task<ActionResult> GetLopHocPhanByTime([FromRoute] string maGV, [FromRoute] string thu, [FromRoute] string gio)
        {
            try
            {
                var lopHocPhan = await context.LopHocPhanRepository.GetSingleLopHocPhanByTimeAsync(maGV, thu, gio);

                if (lopHocPhan != null)
                {
                    // Xử lý kết quả
                    return Ok(lopHocPhan);
                }
                else
                {
                    return NotFound(); // Hoặc một loại response phù hợp nếu không tìm thấy
                }
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpGet("[action]/{maLHP}")]
        public async Task<ActionResult<bool>> CheckIfMaLHPTExists([FromRoute] string maLHP)
        {
            try
            {
                // Sử dụng repository để kiểm tra tồn tại
                var existingLopHocPhan = await context.LopHocPhanRepository.GetSingleAsync(maLHP);

                // Nếu môn học tồn tại, trả về true, ngược lại trả về false
                return Ok(existingLopHocPhan != null);
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpGet("[action]/{maGV}/{thu}/{gio}")]
        public async Task<ActionResult<bool>> CheckTimeGV([FromRoute] string maGV, [FromRoute] string thu, [FromRoute] string gio)
        {
            try
            {
                // Sử dụng repository để kiểm tra tồn tại
                var existingLopHocPhan = await context.LopHocPhanRepository.GetSingleLopHocPhanByTimeAsync(maGV, thu, gio);

                // Nếu môn học tồn tại, trả về true, ngược lại trả về false
                return Ok(existingLopHocPhan != null);
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [Authorize(Roles = "admin")]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] LopHocPhan lophocphan)
        {
            try
            {
                context.LopHocPhanRepository.Update(lophocphan);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpGet("[action]/{maGV}")]
        public async Task<ActionResult<IEnumerable<ChiTietLHP>>> GetLopHocPhanByMaGV([FromRoute] string maGV)
        {
            try
            {
                var result = await context.LopHocPhanRepository.GetLopHocPhanByMaGVAsync(maGV);

                if (result != null && result.Any())
                {
                    return Ok(result);
                }
                else
                {
                    return NotFound(); 
                }
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpGet("[action]/{maSV}")]
        public async Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsByStudent([FromRoute] string maSV)
        {
            return await context.LopHocPhanRepository.GetKetQuaDetailsByStudentAsync(maSV);
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocGiaoVienInfo()
        {
            return await context.LopHocPhanRepository.GetLopHocPhanMonHocGiaoVienInfoAsync();
        }

        [HttpGet("[action]/partial/{partialMaLHP}")]
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocGiaoVienInfoByPartial([FromRoute] string partialMaLHP)
        {
            var lopHocPhans = await context.LopHocPhanRepository.GetLopHocPhanMonHocGiaoVienInfoAsync(lhp => EF.Functions.Like(lhp.MaLHP, $"%{partialMaLHP}%"));
            return lopHocPhans;
        }

    }

    //Cap Phep
    [Route("api/[controller]")]
    [ApiController]
    public class CapPhepsController : ControllerBase
    {
        private IUnitOfWork context;
        public CapPhepsController(IUnitOfWork context)
        {
            this.context = context;
        }
        //Xem 
        [HttpGet("[action]")]
        public async Task<IEnumerable<CapPhep>> Get()
        {
            return await context.CapPhepRepository.GetAsync();
        }
        //Sua
        [Authorize(Roles = "admin")]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] CapPhep capphep)
        {
            try
            {
                context.CapPhepRepository.Update(capphep);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        [HttpGet("[action]/{maCP}")]
        public async Task<CapPhep> Get([FromRoute] string maCP)
        {
            return await context.CapPhepRepository.GetSingleAsync(maCP);
        }
    }

    //Ket Qua
    [Route("api/[controller]")]
    [ApiController]
    public class KetQuasController : ControllerBase
    {
        private IUnitOfWork context;
        public KetQuasController(IUnitOfWork context)
        {
            this.context = context;
        }
        [HttpGet("[action]")]
        public async Task<IEnumerable<KetQua>> Get()
        {
            return await context.KetQuaRepository.GetAsync();
        }
        //Sua
        [Authorize(Roles = "teacher")]
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] KetQua ketqua)
        {
            try
            {
                context.KetQuaRepository.Update(ketqua);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        //Them
        [Authorize(Roles = "student")]
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] KetQua ketqua)
        {
            try
            {
                await context.KetQuaRepository.InsertAsync(ketqua);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }
        //Xoa
        [Authorize(Roles = "student")]
        [HttpDelete("[action]/{maLHP}/{maSV}")]
        public async Task<ActionResult> DeleteKetQuaByMaLHPAndMaSV([FromRoute] string maLHP, [FromRoute] string maSV)
        {
            var isDeleted = await context.KetQuaRepository.DeleteKetQuaByMaLHPAndMaSVAsync(maLHP, maSV);

            if (isDeleted)
            {
                return Ok();
            }
            else
            {
                return NotFound(); 
            }
        }

        //KT SV da dang ky LHP do chua
        [HttpGet("[action]/{maLHP}/{maSV}")]
        public async Task<ActionResult<bool>> ExistsKetQuaByMaLHPAndMaSV([FromRoute] string maLHP, [FromRoute] string maSV)
        {
            var exists = await context.KetQuaRepository.ExistsKetQuaByMaLHPAndMaSVAsync(maLHP, maSV);

            return Ok(exists);
        }

        //KT SV co trung lich ko
        [HttpGet("[action]/{maSV}/{thu}/{gio}")]
        public async Task<ActionResult<bool>> ExistsLopHocPhanBySVThuGio([FromRoute] string maSV, [FromRoute] string thu, [FromRoute] string gio)
        {
            var exists = await context.KetQuaRepository.ExistsLopHocPhanBySVThuGioAsync(maSV, thu, gio);

            return Ok(exists);
        }
        
        //KT SV da dang ky MH do chua
        [HttpGet("[action]/{maSV}/{maMH}")]
        public async Task<ActionResult<bool>> ExistsLopHocPhanBySVMaMH([FromRoute] string maSV, [FromRoute] string maMH)
        {
            var exists = await context.KetQuaRepository.ExistsLopHocPhanBySVMaMHAsync(maSV, maMH);

            return Ok(exists);
        }

    }

    //CMT_LHP
    [Route("api/[controller]")]
    [ApiController]
    public class CMT_LHPsController : ControllerBase
    {
        private IUnitOfWork context;
        public CMT_LHPsController(IUnitOfWork context)
        {
            this.context = context;
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<CMT_LHP>> Get()
        {
            return await context.CMT_LHPRepository.GetAsync();
        }
        //xem 1 
        [HttpGet("[action]/{maCMT}")]
        public async Task<CMT_LHP> Get([FromRoute] string maCMT)
        {
            return await context.CMT_LHPRepository.GetSingleAsync(maCMT);
        }

        //xem nhieu theo maLHP
        [HttpGet("[action]/partial/{partialMaLHP}")]
        public async Task<IEnumerable<CMT_LHP>> GetByPartialMaLHP([FromRoute] string partialMaLHP)
        {
            var cmt_LHPs = await context.CMT_LHPRepository.GetAsync(cmt => EF.Functions.Like(cmt.maLHP, $"%{partialMaLHP}%"));
            return cmt_LHPs;
        }

        //them 
        [Authorize(Roles = "student")]
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] CMT_LHP cmt_lhp)
        {
            try
            {
                await context.CMT_LHPRepository.InsertAsync(cmt_lhp);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //sua 
        
    }
}
