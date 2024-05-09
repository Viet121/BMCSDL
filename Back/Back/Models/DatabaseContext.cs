using Microsoft.EntityFrameworkCore;

namespace Back.Models
{
    public class DatabaseContext: DbContext
    {
        public DbSet<SinhVien> SinhViens { get; set; }
        public DbSet<GiaoVien> GiaoViens { get; set; }
        public DbSet<UserForm> UserForms { get; set; }
        public DbSet<MonHoc> MonHocs { get; set; }
        public DbSet<LopHocPhan> LopHocPhans { get; set; }
        public DbSet<KetQua> KetQuas { get; set; }
        public DbSet<CTDaoTao> CTDaoTaos { get; set; }
        public DbSet<ChiTietLHP> ChiTietLHPs { get; set; }
        public DbSet<CapPhep> CapPheps { get; set; }
        public DbSet<CMT_LHP> CMT_LHPs { get; set; }
        public DbSet<ThongBao> ThongBaos { get; set; }
        public DbSet<KetQua2> KetQua2s { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options)
        : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Cấu hình kết nối database
            optionsBuilder.UseSqlServer("Data Source=LAPTOP-LP2ABT72\\SQLEXPRESS;Initial Catalog=WebSV_BMCSDL;Integrated Security=True;Connect Timeout=30;Encrypt=False;Trust Server Certificate=False;Application Intent=ReadWrite;Multi Subnet Failover=False");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Cấu hình cho CTDaoTao
            /*modelBuilder.Entity<CTDaoTao>(entity =>
            {
                // Thiết lập tên bảng
                entity.ToTable("CTDAOTAO");

                // Cấu hình khóa chính
                entity.HasKey(ct => ct.maCTDT);

                // Cấu hình thuộc tính
                entity.Property(ct => ct.maCTDT).IsRequired().HasMaxLength(100);
                entity.Property(ct => ct.tenCTDT).IsRequired().HasMaxLength(100);
                entity.Property(ct => ct.soTinChi);
                entity.Property(ct => ct.namDT);

                
                // Cấu hình mối quan hệ một-nhiều với MonHoc
                entity.HasMany(ct => ct.MonHocs)
                    .WithOne(mh => mh.CTDaoTaoNavigation)
                    .HasForeignKey(mh => mh.maCTDT)
                    .OnDelete(DeleteBehavior.Cascade); 
            });

            //Giáo viên 
            modelBuilder.Entity<GiaoVien>(entity =>
            {
                // Thiết lập tên bảng
                entity.ToTable("GIAOVIEN");

                // Cấu hình khóa chính
                entity.HasKey(gv => gv.maGV);

                // Cấu hình thuộc tính
                entity.Property(gv => gv.maGV).IsRequired().HasMaxLength(100);
                entity.Property(gv => gv.tenGV).IsRequired().HasMaxLength(100);
                entity.Property(gv => gv.ngaySinh);
                entity.Property(gv => gv.gioiTinh).HasMaxLength(10);
                entity.Property(gv => gv.sdt).HasMaxLength(20);
                entity.Property(gv => gv.diaChi).HasMaxLength(255);

                // Cấu hình mối quan hệ một-nhiều với LopHocPhan
                entity.HasMany(gv => gv.LopHocPhans)
                    .WithOne(lhp => lhp.GiaoVienNavigation)
                    .HasForeignKey(lhp => lhp.maGV)
                    .OnDelete(DeleteBehavior.Restrict); 
            });

            //Lớp học phần
            modelBuilder.Entity<LopHocPhan>(entity =>
            {
                // Thiết lập tên bảng
                entity.ToTable("LOPHOCPHAN");

                // Cấu hình khóa chính
                entity.HasKey(lhp => lhp.maLHP);

                // Cấu hình thuộc tính
                entity.Property(lhp => lhp.maLHP).IsRequired().HasMaxLength(100);
                entity.Property(lhp => lhp.maMH).IsRequired().HasMaxLength(100);
                entity.Property(lhp => lhp.maGV).IsRequired().HasMaxLength(100);
                entity.Property(lhp => lhp.thu).HasMaxLength(10);
                entity.Property(lhp => lhp.gio).HasMaxLength(10);

                // Cấu hình mối quan hệ một-nhiều với KetQua
                entity.HasMany(lhp => lhp.KetQuas)
                    .WithOne(kq => kq.LopHocPhanNavigation)
                    .HasForeignKey(kq => kq.maLHP)
                    .OnDelete(DeleteBehavior.Cascade); 

                // Cấu hình mối quan hệ nhiều-một với MonHoc
                entity.HasOne(lhp => lhp.MonHocNavigation)
                    .WithMany(mh => mh.LopHocPhans)
                    .HasForeignKey(lhp => lhp.maMH)
                    .OnDelete(DeleteBehavior.Restrict); 

                // Cấu hình mối quan hệ nhiều-một với GiaoVien
                entity.HasOne(lhp => lhp.GiaoVienNavigation)
                    .WithMany(gv => gv.LopHocPhans)
                    .HasForeignKey(lhp => lhp.maGV)
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasMany(lhp => lhp.CMT_LHPs)
                    .WithOne(cmt => cmt.LopHocPhanNavigation)
                    .HasForeignKey(cmt => cmt.maLHP)
                    .OnDelete(DeleteBehavior.Cascade);
            });
            modelBuilder.Entity<CMT_LHP>(entity =>
            {
                entity.ToTable("CMT_LHP");

                // Cấu hình khóa chính
                entity.HasKey(cmt => cmt.maCMT);

                entity.Property(lhp => lhp.maCMT).IsRequired().HasMaxLength(100);
                entity.Property(lhp => lhp.maLHP).IsRequired().HasMaxLength(100);
                entity.Property(lhp => lhp.noiDung).IsRequired().HasMaxLength(100);
                entity.Property(sv => sv.ngayCMT);

                entity.HasOne(cmt => cmt.LopHocPhanNavigation)
                    .WithMany(lhp => lhp.CMT_LHPs)
                    .HasForeignKey(cmt => cmt.maLHP)
                    .OnDelete(DeleteBehavior.Restrict);

            });

            // Mon Hoc 
            modelBuilder.Entity<MonHoc>(entity =>
            {
                // Thiết lập tên bảng
                entity.ToTable("MONHOC");

                // Cấu hình khóa chính
                entity.HasKey(mh => mh.maMH);

                // Cấu hình thuộc tính
                entity.Property(mh => mh.maMH).IsRequired().HasMaxLength(100);
                entity.Property(mh => mh.tenMH).IsRequired().HasMaxLength(100);
                entity.Property(mh => mh.soTinChiMH);
                entity.Property(mh => mh.maCTDT).IsRequired().HasMaxLength(100);

                // Cấu hình mối quan hệ một-nhiều với LopHocPhan
                entity.HasMany(mh => mh.LopHocPhans)
                    .WithOne(lhp => lhp.MonHocNavigation)
                    .HasForeignKey(lhp => lhp.maMH)
                    .OnDelete(DeleteBehavior.Cascade); 

                // Cấu hình mối quan hệ nhiều-một với CTDaoTao
                entity.HasOne(mh => mh.CTDaoTaoNavigation)
                    .WithMany(ct => ct.MonHocs)
                    .HasForeignKey(mh => mh.maCTDT)
                    .OnDelete(DeleteBehavior.Restrict); 
            });

            // Sinh Vien
            modelBuilder.Entity<SinhVien>(entity =>
            {
                // Thiết lập tên bảng
                entity.ToTable("SINHVIEN");

                // Cấu hình khóa chính
                entity.HasKey(sv => sv.maSV);

                // Cấu hình thuộc tính
                entity.Property(sv => sv.maSV).IsRequired().HasMaxLength(100);
                entity.Property(sv => sv.tenSV).IsRequired().HasMaxLength(100);
                entity.Property(sv => sv.ngaySinh);
                entity.Property(sv => sv.gioiTinh).HasMaxLength(10);
                entity.Property(sv => sv.sdt).HasMaxLength(20);
                entity.Property(sv => sv.diaChi).HasMaxLength(255);
                entity.Property(sv => sv.namNhapH);
                entity.Property(sv => sv.maCTDT).HasMaxLength(100);

                // Cấu hình mối quan hệ một-nhiều với KetQua
                entity.HasMany(sv => sv.KetQuas)
                    .WithOne(kq => kq.SinhVienNavigation)
                    .HasForeignKey(kq => kq.maSV)
                    .OnDelete(DeleteBehavior.Cascade); 

            });
            */

            modelBuilder.Entity<KetQua>(entity =>
            {
                // Thiết lập tên bảng
                entity.ToTable("KQUA");

                // Cấu hình khóa chính
                entity.HasKey(kq => new { kq.maLHP, kq.maSV });

                // Cấu hình thuộc tính
                entity.Property(kq => kq.maLHP).IsRequired().HasMaxLength(100);
                entity.Property(kq => kq.maSV).IsRequired().HasMaxLength(100);
                entity.Property(kq => kq.diem);
                /*
                // Cấu hình mối quan hệ nhiều-một với LopHocPhan
                entity.HasOne(kq => kq.LopHocPhanNavigation)
                    .WithMany(lhp => lhp.KetQuas)
                    .HasForeignKey(kq => kq.maLHP)
                    .OnDelete(DeleteBehavior.Restrict); 

                // Cấu hình mối quan hệ nhiều-một với SinhVien
                entity.HasOne(kq => kq.SinhVienNavigation)
                    .WithMany(sv => sv.KetQuas)
                    .HasForeignKey(kq => kq.maSV)
                    .OnDelete(DeleteBehavior.Restrict); 
                */
            });
            modelBuilder.Entity<KetQua2>(entity =>
            {
                // Thiết lập tên bảng
                entity.ToTable("KETQUA");

                // Cấu hình khóa chính
                entity.HasKey(kq => new { kq.maLHP, kq.maSV });

                // Cấu hình thuộc tính
                entity.Property(kq => kq.maLHP).IsRequired().HasMaxLength(100);
                entity.Property(kq => kq.maSV).IsRequired().HasMaxLength(100);
                entity.Property(kq => kq.diem).HasColumnType("varbinary(max)");
                /*
                // Cấu hình mối quan hệ nhiều-một với LopHocPhan
                entity.HasOne(kq => kq.LopHocPhanNavigation)
                    .WithMany(lhp => lhp.KetQuas)
                    .HasForeignKey(kq => kq.maLHP)
                    .OnDelete(DeleteBehavior.Restrict);

                // Cấu hình mối quan hệ nhiều-một với SinhVien
                entity.HasOne(kq => kq.SinhVienNavigation)
                    .WithMany(sv => sv.KetQuas)
                    .HasForeignKey(kq => kq.maSV)
                    .OnDelete(DeleteBehavior.Restrict);
                */
            });

        }
    }
}
