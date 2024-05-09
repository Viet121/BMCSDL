using Back.DataAccess;
using Back.Helpers;
using Back.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace Back.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KetQua2sController : ControllerBase
    {
        private IUnitOfWork context;
        public KetQua2sController(IUnitOfWork context)
        {
            this.context = context;
        }
        //Hien thi toan bo 
        [HttpGet("[action]")]
        public async Task<IEnumerable<KetQua2>> Get()
        {
            return await context.KetQua2Repository.GetAsync();
        }

        //Them 
        [HttpPost("[action]")]
        public async Task<ActionResult> Insert([FromBody] KetQua data)
        {
            try
            {
                byte[] encryptedDiem = PasswordHasher.EncryptAES256(data.diem);
                var kq = new KetQua2
                {
                    maLHP = data.maLHP,
                    maSV = data.maSV,
                    diem = encryptedDiem,
                };

                await context.KetQua2Repository.InsertAsync(kq);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        // Xem toan bo LHP, Diem cua 1 SV
        [HttpGet("[action]/{maSV}")]
        public async Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsByStudent([FromRoute] string maSV)
        {
            return await context.KetQua2Repository.GetKetQuaDetailsByStudentAsync2(maSV);
        }

        //Sua
        [HttpPut("[action]")]
        public async Task<ActionResult> Update([FromBody] KetQua ketqua)
        {
            try
            {
                byte[] encryptedDiem = PasswordHasher.EncryptAES256(ketqua.diem);
                var kq = new KetQua2
                {
                    maLHP = ketqua.maLHP,
                    maSV = ketqua.maSV,
                    diem = encryptedDiem,
                };
                context.KetQua2Repository.Update(kq);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.ToString());
            }
        }

        //Xoa
        [HttpDelete("[action]/{maLHP}/{maSV}")]
        public async Task<ActionResult> DeleteKetQuaByMaLHPAndMaSV([FromRoute] string maLHP, [FromRoute] string maSV)
        {
            var isDeleted = await context.KetQua2Repository.DeleteKetQuaByMaLHPAndMaSVAsync2(maLHP, maSV);

            if (isDeleted)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        //Xem toan bo sinh vien cua LHP
        [HttpGet("[action]/{maLHP}")]
        public async Task<IEnumerable<ChiTietLHP>> GetKetQuaDetails([FromRoute] string maLHP)
        {
            return await context.KetQua2Repository.GetKetQuaDetailsAsync2(maLHP);
        }

        //Xem toan bo LHP
        [HttpGet("[action]")]
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoWithCount()
        {
            return await context.KetQua2Repository.GetLopHocPhanMonHocInfoWithCountAsync2();
        }

        //Xem toan bo LHP voi maLHP
        [HttpGet("[action]/partial/{partialMaLHP}")]
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoWithCountSearch([FromRoute] string partialMaLHP)
        {
            return await context.KetQua2Repository.GetLopHocPhanMonHocInfoWithCountAsync2(lhp => EF.Functions.Like(lhp.maLHP, $"%{partialMaLHP}%"));
        }

        //Xem toan bo LHP cua 1 GV 
        [HttpGet("[action]/{maGV}")]
        public async Task<ActionResult<IEnumerable<ChiTietLHP>>> GetLopHocPhanByMaGV([FromRoute] string maGV)
        {
            try
            {
                var result = await context.KetQua2Repository.GetLopHocPhanByMaGVAsync2(maGV);

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

        //KT SV da dang ky LHP do chua
        [HttpGet("[action]/{maLHP}/{maSV}")]
        public async Task<ActionResult<bool>> ExistsKetQuaByMaLHPAndMaSV([FromRoute] string maLHP, [FromRoute] string maSV)
        {
            var exists = await context.KetQua2Repository.ExistsKetQuaByMaLHPAndMaSVAsync2(maLHP, maSV);

            return Ok(exists);
        }

        //KT SV co trung lich ko
        [HttpGet("[action]/{maSV}/{thu}/{gio}")]
        public async Task<ActionResult<bool>> ExistsLopHocPhanBySVThuGio([FromRoute] string maSV, [FromRoute] string thu, [FromRoute] string gio)
        {
            var exists = await context.KetQua2Repository.ExistsLopHocPhanBySVThuGioAsync2(maSV, thu, gio);

            return Ok(exists);
        }

        //KT SV da dang ky MH do chua
        [HttpGet("[action]/{maSV}/{maMH}")]
        public async Task<ActionResult<bool>> ExistsLopHocPhanBySVMaMH([FromRoute] string maSV, [FromRoute] string maMH)
        {
            var exists = await context.KetQua2Repository.ExistsLopHocPhanBySVMaMHAsync2(maSV, maMH);

            return Ok(exists);
        }

        //KT lhp do da du so luong chua
        [HttpGet("[action]/{maLHP}")]
        public async Task<ActionResult<bool>> IsSoLuongGreaterThanKetQuaCount([FromRoute] string maLHP)
        {
            var exists = await context.KetQua2Repository.IsSoLuongGreaterThanKetQuaCount(maLHP);

            return Ok(exists);
        }

        //Xem LHP voi maLHP 
        [HttpGet("[action]/{maLHP}")]
        public async Task<ChiTietLHP> Get([FromRoute] string maLHP)
        {
            return await context.KetQua2Repository.GetSingleAsyncCTLHP(maLHP);
        }
    }
}
