using Back.Helpers;
using Back.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Back.DataAccess
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class, new()
    {
        private readonly DbContext context;
  
        public Repository(DbContext context)
        {
            this.context = context;
        }
       
        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> filter = null)
        {
            IQueryable<TEntity> query = context.Set<TEntity>();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return await query.ToListAsync();
        }

        public async Task InsertAsync(TEntity entity)
        {
            await context.Set<TEntity>().AddAsync(entity);
        }

        public async Task<TEntity> GetSingleAsync(object maSV)
        {
            return await context.Set<TEntity>().FindAsync(maSV);
        }

        public void Update(TEntity entity)
        {
            context.Set<TEntity>().Update(entity);
        }
        public async Task DeleteAsync(object maSV)
        {
            var entity = await GetSingleAsync(maSV);
            context.Set<TEntity>().Remove(entity);
        }
        public async Task DeleteAsync2(Expression<Func<TEntity, bool>> filter)
        {
            var entitiesToDelete = await context.Set<TEntity>().Where(filter).ToListAsync();

            foreach (var entity in entitiesToDelete)
            {
                context.Set<TEntity>().Remove(entity);
            }
        }
        public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> filter)
        {
            return await context.Set<TEntity>().AnyAsync(filter);
        }

        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoAsync()
        {
            var result = await context.Set<LopHocPhan>()
                .Join(
                    context.Set<MonHoc>(),
                    lp => lp.maMH,
                    mh => mh.maMH,
                    (lp, mh) => new ChiTietLHP
                    {
                        MaLHP = lp.maLHP,
                        MaMH = lp.maMH,
                        TenMH = mh.tenMH,
                        MaGV = lp.maGV,
                        Thu = lp.thu,
                        Gio = lp.gio,
                    }
                )
                .ToListAsync();

            return result;
        }
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoWithCountAsync()
        {
            var result = await context.Set<LopHocPhan>()
                .GroupJoin(
                    context.Set<KetQua>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kqGroup) => new { lp, kqGroup }
                )
                .Join(
                    context.Set<MonHoc>(),
                    lpkq => lpkq.lp.maMH,
                    mh => mh.maMH,
                    (lpkq, mh) => new
                    {
                        MaLHP = lpkq.lp.maLHP,
                        MaMH = mh.maMH,
                        TenMH = mh.tenMH,
                        SoLuongSV = lpkq.kqGroup.Count()
                    }
                )
                .ToListAsync();

            var finalResult = result.Select(r => new ChiTietLHP
            {
                MaLHP = r.MaLHP,
                MaMH = r.MaMH,
                TenMH = r.TenMH,
                SoLuongSV = r.SoLuongSV
                // Thêm các thuộc tính khác nếu cần
            });

            return finalResult;
        }

        //BMCSDL
        public async Task<ChiTietLHP> GetSingleAsyncCTLHP(string maLHP)
        {
            var result = await context.Set<LopHocPhan>()
                .Where(lp => lp.maLHP == maLHP) // Tìm kiếm theo mã LHP
                .Select(lp => new
                {
                    LopHocPhan = lp,
                    MonHoc = context.Set<MonHoc>().FirstOrDefault(mh => mh.maMH == lp.maMH)
                })
                .Select(x => new ChiTietLHP
                {
                    MaLHP = x.LopHocPhan.maLHP,
                    MaMH = x.LopHocPhan.maMH,
                    TenMH = x.MonHoc.tenMH,
                    Thu = x.LopHocPhan.thu,
                    Gio = x.LopHocPhan.gio
                })
                .FirstOrDefaultAsync();

            return result;
        }
        /*
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoWithCountAsync2()
        {
            var result = await context.Set<LopHocPhan>()
                .GroupJoin(
                    context.Set<KetQua2>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kqGroup) => new { lp, kqGroup }
                )
                .Join(
                    context.Set<MonHoc>(),
                    lpkq => lpkq.lp.maMH,
                    mh => mh.maMH,
                    (lpkq, mh) => new
                    {
                        MaLHP = lpkq.lp.maLHP,
                        MaMH = mh.maMH,
                        TenMH = mh.tenMH,
                        SoLuongSV = lpkq.kqGroup.Count()

                    }
                )
                .ToListAsync();

            var finalResult = result.Select(r => new ChiTietLHP
            {
                MaLHP = r.MaLHP,
                MaMH = r.MaMH,
                TenMH = r.TenMH,
                SoLuongSV = r.SoLuongSV
                // Thêm các thuộc tính khác nếu cần
            });

            return finalResult;
        }
        */
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocInfoWithCountAsync2(Expression<Func<LopHocPhan, bool>> filter = null)
        {
            IQueryable<LopHocPhan> query = context.Set<LopHocPhan>();

            if (filter != null)
            {
                query = query.Where(filter);
            }

            var result = await query
                .GroupJoin(
                    context.Set<KetQua2>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kqGroup) => new { lp, kqGroup }
                )
                .Join(
                    context.Set<MonHoc>(),
                    lpkq => lpkq.lp.maMH,
                    mh => mh.maMH,
                    (lpkq, mh) => new { lpkq, mh }
                )
                .Join(
                    context.Set<GiaoVien>(),
                    lpkqmh => lpkqmh.lpkq.lp.maGV,
                    gv => gv.maGV,
                    (lpkqmh, gv) => new
                    {
                        lpkqmh.lpkq.lp.maLHP,
                        lpkqmh.mh.maMH,
                        lpkqmh.lpkq.lp.soLuong,
                        lpkqmh.mh.tenMH,
                        gv.maGV,
                        gv.tenGV,
                        lpkqmh.lpkq.lp.thu,
                        lpkqmh.lpkq.lp.gio,
                        SoLuongSV = lpkqmh.lpkq.kqGroup.Count()
                    }
                )
                .ToListAsync();

            var finalResult = result.Select(r => new ChiTietLHP
            {
                MaLHP = r.maLHP,
                MaMH = r.maMH,
                SoLuong = r.soLuong,
                TenMH = r.tenMH,
                MaGV = r.maGV,
                TenGV = r.tenGV,
                Thu = r.thu,
                Gio = r.gio,
                SoLuongSV = r.SoLuongSV
                // Thêm các thuộc tính khác nếu cần
            });

            return finalResult;
        }

        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanDetailsAsync(string maLHP)
        {
            var result = await context.Set<LopHocPhan>()
                .Join(
                    context.Set<MonHoc>(),
                    lp => lp.maMH,
                    mh => mh.maMH,
                    (lp, mh) => new { lp, mh }
                )
                .Join(
                    context.Set<GiaoVien>(),
                    lpmh => lpmh.lp.maGV,
                    gv => gv.maGV,
                    (lpmh, gv) => new ChiTietLHP
                    {
                        MaLHP = lpmh.lp.maLHP,
                        MaMH = lpmh.mh.maMH,
                        TenMH = lpmh.mh.tenMH,
                        MaGV = gv.maGV,
                        TenGV = gv.tenGV,
                        Thu = lpmh.lp.thu,
                        Gio = lpmh.lp.gio
                    }
                )
                .Where(result => result.MaLHP == maLHP)
                .ToListAsync();

            return result;
        }

        public async Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsAsync(string maLHP)
        {
            var result = await context.Set<SinhVien>()
                .Join(
                    context.Set<KetQua>(),
                    sv => sv.maSV,
                    kq => kq.maSV,
                    (sv, kq) => new { sv, kq }
                )
                .Join(
                    context.Set<LopHocPhan>(),
                    svkq => svkq.kq.maLHP,
                    lp => lp.maLHP,
                    (svkq, lp) => new { svkq, lp }
                )
                .Join(
                    context.Set<MonHoc>(),
                    svkqlp => svkqlp.lp.maMH,
                    mh => mh.maMH,
                    (svkqlp, mh) => new ChiTietLHP
                    {
                        MaLHP = svkqlp.lp.maLHP,
                        MaMH = mh.maMH,
                        TenMH = mh.tenMH,
                        MaSV = svkqlp.svkq.sv.maSV,
                        TenSV = svkqlp.svkq.sv.tenSV,
                        Diem = svkqlp.svkq.kq.diem
                    }
                )
                .Where(result => result.MaLHP == maLHP)
                .ToListAsync();

            return result;
        }
        public async Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsAsync2(string maLHP)
        {
            var result = await context.Set<SinhVien>()
                .Join(
                    context.Set<KetQua2>(),
                    sv => sv.maSV,
                    kq => kq.maSV,
                    (sv, kq) => new { sv, kq }
                )
                .Join(
                    context.Set<LopHocPhan>(),
                    svkq => svkq.kq.maLHP,
                    lp => lp.maLHP,
                    (svkq, lp) => new { svkq, lp }
                )
                .Join(
                    context.Set<MonHoc>(),
                    svkqlp => svkqlp.lp.maMH,
                    mh => mh.maMH,
                    (svkqlp, mh) => new ChiTietLHP
                    {
                        MaLHP = svkqlp.lp.maLHP,
                        MaMH = mh.maMH,
                        TenMH = mh.tenMH,
                        MaSV = svkqlp.svkq.sv.maSV,
                        TenSV = svkqlp.svkq.sv.tenSV,
                        Diem = PasswordHasher.DecryptAES256(svkqlp.svkq.kq.diem),
                    }
                )
                .Where(result => result.MaLHP == maLHP)
                .ToListAsync();

            return result;
        }

        public async Task<LopHocPhan> GetSingleLopHocPhanByTimeAsync(string maGV, string thu, string gio)
        {
            return await context.Set<LopHocPhan>()
                .FirstOrDefaultAsync(lhp => lhp.maGV == maGV && lhp.thu == thu && lhp.gio == gio);
        }

        public async Task<UserForm> GetCredentialsAsync(string email, string password)
        {
            return await context.Set<UserForm>().FirstOrDefaultAsync(userForm => userForm.email == email && userForm.password == password);
        }
        public async Task<UserForm> GetUserByEmailAsync(string email)
        {
            return await context.Set<UserForm>().FirstOrDefaultAsync(userForm => userForm.email == email );
        }
        public async Task<bool> UpdateUserFormAsync(string email, Action<UserForm> updateAction)
        {
            var userForm = await context.Set<UserForm>().FirstOrDefaultAsync(u => u.email == email);

            if (userForm == null)
            {
                // Không tìm thấy UserForm với email cung cấp
                return false;
            }

            // Áp dụng các thay đổi vào userForm
            updateAction(userForm);

            // Cập nhật context
            context.Set<UserForm>().Update(userForm);
            await context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanByMaGVAsync(string maGV)
        {
            var result = await context.Set<LopHocPhan>()
                .Where(lhp => lhp.maGV == maGV)
                .GroupJoin(
                    context.Set<KetQua>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kqGroup) => new { lp, kqGroup }
                )
                .Join(
                    context.Set<MonHoc>(),
                    lpkq => lpkq.lp.maMH,
                    mh => mh.maMH,
                    (lpkq, mh) => new ChiTietLHP
                    {
                        MaLHP = lpkq.lp.maLHP,
                        MaMH = mh.maMH,
                        TenMH = mh.tenMH,
                        SoLuongSV = lpkq.kqGroup.Count(),
                        Thu = lpkq.lp.thu,
                        Gio = lpkq.lp.gio
                    }
                )
                .ToListAsync();

            var finalResult = result.Select(r => new ChiTietLHP
            {
                MaLHP = r.MaLHP,
                MaMH = r.MaMH,
                TenMH = r.TenMH,
                SoLuongSV = r.SoLuongSV,
                Thu = r.Thu,
                Gio = r.Gio
            });

            return finalResult;
        }
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanByMaGVAsync2(string maGV)
        {
            var result = await context.Set<LopHocPhan>()
                .Where(lhp => lhp.maGV == maGV)
                .GroupJoin(
                    context.Set<KetQua2>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kqGroup) => new { lp, kqGroup }
                )
                .Join(
                    context.Set<MonHoc>(),
                    lpkq => lpkq.lp.maMH,
                    mh => mh.maMH,
                    (lpkq, mh) => new ChiTietLHP
                    {
                        MaLHP = lpkq.lp.maLHP,
                        MaMH = mh.maMH,
                        TenMH = mh.tenMH,
                        SoLuongSV = lpkq.kqGroup.Count(),
                        Thu = lpkq.lp.thu,
                        Gio = lpkq.lp.gio
                    }
                )
                .ToListAsync();

            var finalResult = result.Select(r => new ChiTietLHP
            {
                MaLHP = r.MaLHP,
                MaMH = r.MaMH,
                TenMH = r.TenMH,
                SoLuongSV = r.SoLuongSV,
                Thu = r.Thu,
                Gio = r.Gio
            });

            return finalResult;
        }

        public async Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsByStudentAsync(string maSV)
        {
            var result = await context.Set<SinhVien>()
                .Where(sv => sv.maSV == maSV)
                .Join(
                    context.Set<KetQua>(),
                    sv => sv.maSV,
                    kq => kq.maSV,
                    (sv, kq) => new { sv, kq }
                )
                .Join(
                    context.Set<LopHocPhan>(),
                    svkq => svkq.kq.maLHP,
                    lp => lp.maLHP,
                    (svkq, lp) => new { svkq, lp }
                )
                .Join(
                    context.Set<MonHoc>(),
                    svkqlp => svkqlp.lp.maMH,
                    mh => mh.maMH,
                    (svkqlp, mh) => new
                    {
                        MaLHP = svkqlp.lp.maLHP,
                        MaMH = mh.maMH,
                        TenMH = mh.tenMH,
                        MaSV = svkqlp.svkq.sv.maSV,
                        TenSV = svkqlp.svkq.sv.tenSV,
                        Diem = svkqlp.svkq.kq.diem
                    }
                )
                .Join(
                    context.Set<LopHocPhan>(),
                    result => result.MaLHP,
                    lp => lp.maLHP,
                    (result, lp) => new
                    {
                        result.MaLHP,
                        result.MaMH,
                        result.TenMH,
                        result.MaSV,
                        result.TenSV,
                        result.Diem,
                        lp.maGV,
                        lp.thu,
                        lp.gio
                    }
                )
                .Join(
                    context.Set<GiaoVien>(),
                    lp => lp.maGV,
                    gv => gv.maGV,
                    (lp, gv) => new ChiTietLHP
                    {
                        MaLHP = lp.MaLHP,
                        MaMH = lp.MaMH,
                        TenMH = lp.TenMH,
                        MaGV = lp.maGV,
                        TenGV = gv.tenGV,
                        Thu = lp.thu,
                        Gio = lp.gio,
                        MaSV = lp.MaSV,
                        TenSV = lp.TenSV,
                        Diem = lp.Diem
                    }
                )
                .OrderBy(result => result.MaLHP)
                .ToListAsync();

            return result;
        }

        public async Task<IEnumerable<ChiTietLHP>> GetKetQuaDetailsByStudentAsync2(string maSV)
        {
            var result = await context.Set<SinhVien>()
                .Where(sv => sv.maSV == maSV)
                .Join(
                    context.Set<KetQua2>(),
                    sv => sv.maSV,
                    kq => kq.maSV,
                    (sv, kq) => new { sv, kq }
                )
                .Join(
                    context.Set<LopHocPhan>(),
                    svkq => svkq.kq.maLHP,
                    lp => lp.maLHP,
                    (svkq, lp) => new { svkq, lp }
                )
                .Join(
                    context.Set<MonHoc>(),
                    svkqlp => svkqlp.lp.maMH,
                    mh => mh.maMH,
                    (svkqlp, mh) => new
                    {
                        MaLHP = svkqlp.lp.maLHP,
                        MaMH = mh.maMH,
                        TenMH = mh.tenMH,
                        MaSV = svkqlp.svkq.sv.maSV,
                        TenSV = svkqlp.svkq.sv.tenSV,
                        Diem = svkqlp.svkq.kq.diem
                    }
                )
                .Join(
                    context.Set<LopHocPhan>(),
                    result => result.MaLHP,
                    lp => lp.maLHP,
                    (result, lp) => new
                    {
                        result.MaLHP,
                        result.MaMH,
                        result.TenMH,
                        result.MaSV,
                        result.TenSV,
                        result.Diem,
                        lp.maGV,
                        lp.thu,
                        lp.gio
                    }
                )
                .Join(
                    context.Set<GiaoVien>(),
                    lp => lp.maGV,
                    gv => gv.maGV,
                    (lp, gv) => new ChiTietLHP
                    {
                        MaLHP = lp.MaLHP,
                        MaMH = lp.MaMH,
                        TenMH = lp.TenMH,
                        MaGV = lp.maGV,
                        TenGV = gv.tenGV,
                        Thu = lp.thu,
                        Gio = lp.gio,
                        MaSV = lp.MaSV,
                        TenSV = lp.TenSV,
                        Diem = PasswordHasher.DecryptAES256(lp.Diem),
        }
                )
                .OrderBy(result => result.MaLHP)
                .ToListAsync();

            return result;
        }
        public async Task<IEnumerable<ChiTietLHP>> GetLopHocPhanMonHocGiaoVienInfoAsync(Expression<Func<ChiTietLHP, bool>> filter = null)
        {
            var query = context.Set<LopHocPhan>()
                .Join(
                    context.Set<MonHoc>(),
                    lp => lp.maMH,
                    mh => mh.maMH,
                    (lp, mh) => new { lp, mh }
                )
                .Join(
                    context.Set<GiaoVien>(),
                    lpmh => lpmh.lp.maGV,
                    gv => gv.maGV,
                    (lpmh, gv) => new ChiTietLHP
                    {
                        MaLHP = lpmh.lp.maLHP,
                        MaMH = lpmh.mh.maMH,
                        TenMH = lpmh.mh.tenMH,
                        MaGV = gv.maGV,
                        TenGV = gv.tenGV,
                        Thu = lpmh.lp.thu,
                        Gio = lpmh.lp.gio
                    }
                );
            if (filter != null)
            {
                query = query.Where(filter);
            }

            var result = await query.ToListAsync();

            return result;

        }

        public async Task<bool> DeleteKetQuaByMaLHPAndMaSVAsync(string maLHP, string maSV)
        {
            var ketQuaToDelete = await context.Set<KetQua>()
                .FirstOrDefaultAsync(kq => kq.maLHP == maLHP && kq.maSV == maSV);

            if (ketQuaToDelete != null)
            {
                context.Set<KetQua>().Remove(ketQuaToDelete);
                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false; 
            }
        }
        public async Task<bool> DeleteKetQuaByMaLHPAndMaSVAsync2(string maLHP, string maSV)
        {
            var ketQuaToDelete = await context.Set<KetQua2>()
                .FirstOrDefaultAsync(kq => kq.maLHP == maLHP && kq.maSV == maSV);

            if (ketQuaToDelete != null)
            {
                context.Set<KetQua2>().Remove(ketQuaToDelete);
                await context.SaveChangesAsync();
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> ExistsKetQuaByMaLHPAndMaSVAsync(string maLHP, string maSV)
        {
            return await context.Set<KetQua>().AnyAsync(kq => kq.maLHP == maLHP && kq.maSV == maSV);
        }

        public async Task<bool> ExistsLopHocPhanBySVThuGioAsync(string maSV, string thu, string gio)
        {
            return await context.Set<LopHocPhan>()
                .Join(
                    context.Set<KetQua>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kq) => new { lp, kq }
                )
                .Join(
                    context.Set<SinhVien>(),
                    lpkq => lpkq.kq.maSV,
                    sv => sv.maSV,
                    (lpkq, sv) => new { lpkq, sv }
                )
                .Where(result => result.sv.maSV == maSV && result.lpkq.lp.thu == thu && result.lpkq.lp.gio == gio)
                .AnyAsync();
        }
        public async Task<bool> ExistsLopHocPhanBySVMaMHAsync(string maSV, string maMH)
        {
            return await context.Set<LopHocPhan>()
                .Join(
                    context.Set<KetQua>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kq) => new { lp, kq }
                )
                .Join(
                    context.Set<SinhVien>(),
                    lpkq => lpkq.kq.maSV,
                    sv => sv.maSV,
                    (lpkq, sv) => new { lpkq, sv }
                )
                .Where(result => result.sv.maSV == maSV && result.lpkq.lp.maMH == maMH)
                .AnyAsync();
        }

        public async Task<bool> ExistsKetQuaByMaLHPAndMaSVAsync2(string maLHP, string maSV)
        {
            return await context.Set<KetQua2>().AnyAsync(kq => kq.maLHP == maLHP && kq.maSV == maSV);
        }

        public async Task<bool> ExistsLopHocPhanBySVThuGioAsync2(string maSV, string thu, string gio)
        {
            return await context.Set<LopHocPhan>()
                .Join(
                    context.Set<KetQua2>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kq) => new { lp, kq }
                )
                .Join(
                    context.Set<SinhVien>(),
                    lpkq => lpkq.kq.maSV,
                    sv => sv.maSV,
                    (lpkq, sv) => new { lpkq, sv }
                )
                .Where(result => result.sv.maSV == maSV && result.lpkq.lp.thu == thu && result.lpkq.lp.gio == gio)
                .AnyAsync();
        }
        public async Task<bool> ExistsLopHocPhanBySVMaMHAsync2(string maSV, string maMH)
        {
            return await context.Set<LopHocPhan>()
                .Join(
                    context.Set<KetQua2>(),
                    lp => lp.maLHP,
                    kq => kq.maLHP,
                    (lp, kq) => new { lp, kq }
                )
                .Join(
                    context.Set<SinhVien>(),
                    lpkq => lpkq.kq.maSV,
                    sv => sv.maSV,
                    (lpkq, sv) => new { lpkq, sv }
                )
                .Where(result => result.sv.maSV == maSV && result.lpkq.lp.maMH == maMH)
                .AnyAsync();
        }
        public async Task<bool> IsSoLuongGreaterThanKetQuaCount(string maLHP)
        {
            var result = await context.Set<LopHocPhan>()
                .Where(lp => lp.maLHP == maLHP)
                .Select(lp => lp.soLuong)
                .FirstOrDefaultAsync();

            if (result == null)
            {
                // Trường hợp không tìm thấy bản ghi với maLHP đã cho
                return false; // hoặc true tùy thuộc vào yêu cầu
            }

            var ketQuaCount = await context.Set<KetQua2>()
                .CountAsync(kq => kq.maLHP == maLHP);

            return result > ketQuaCount;
        }

        public async Task ImportSinhVienDataAsync(List<SinhVien> sinhVienData)
        {
            
            foreach (var sinhVienModel in sinhVienData)
            {
                var sinhVien = new SinhVien
                {
                    maSV = sinhVienModel.maSV,
                    tenSV = sinhVienModel.tenSV,
                    ngaySinh = sinhVienModel.ngaySinh,
                    gioiTinh = sinhVienModel.gioiTinh,
                    sdt = sinhVienModel.sdt,
                    diaChi = sinhVienModel.diaChi,
                    namNhapH = sinhVienModel.namNhapH,
                    maCTDT = sinhVienModel.maCTDT
                };

                await context.Set<SinhVien>().AddAsync(sinhVien);
                await context.SaveChangesAsync();
            }
            
        }

        public async Task ImportGiaoVienDataAsync(List<GiaoVien> giaoVienData)
        {

            foreach (var giaoVienModel in giaoVienData)
            {
                var giaoVien = new GiaoVien
                {
                    maGV = giaoVienModel.maGV,
                    tenGV = giaoVienModel.tenGV,
                    ngaySinh = giaoVienModel.ngaySinh,
                    gioiTinh = giaoVienModel.gioiTinh,
                    sdt = giaoVienModel.sdt,
                    diaChi = giaoVienModel.diaChi
                };

                await context.Set<GiaoVien>().AddAsync(giaoVien);
                await context.SaveChangesAsync();
            }

        }

    }
}
