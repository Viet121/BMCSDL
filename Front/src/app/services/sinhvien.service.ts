import { Injectable } from '@angular/core';
import { SinhVien } from '../models/sinhvien';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { GiaoVien } from '../models/giaovien';
import { UserForm } from '../models/userform';
import { MonHoc } from '../models/monhoc';
import { LopHocPhan } from '../models/lophocphan';
import { CapPhep } from '../models/capphep';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt'
import { KetQua } from '../models/ketqua';
import { CMT_LHP } from '../models/cmtlhp';
import { ThongBao } from '../models/thongbao';


@Injectable({
  providedIn: 'root'
})

export class SinhvienService {

  private userPayload:any;
  constructor(private httpClient: HttpClient, private router: Router) { 
    this.userPayload = this.decodedToken();
  }
   // Sinh Vien
  getSinhViens() {
    return this.httpClient.get<SinhVien[]>("https://localhost:7171/api/SinhViens/Get");
  }

  getSinhVienByMaSV(maSV: string){
    return this.httpClient.get<SinhVien[]>("https://localhost:7171/api/SinhViens/GetByPartialMaSV/partial/"+ maSV);
  }

  addSinhVien(addSinhVienRequest: SinhVien): Observable<SinhVien>{
    addSinhVienRequest.namNhapH = 2021;
    addSinhVienRequest.maCTDT = 'CNTT_47';
    addSinhVienRequest.maSV = '';
    return this.httpClient.post<SinhVien>("https://localhost:7171/api/SinhViens/Insert", addSinhVienRequest);
  }

  getSinhVien(maSV: string): Observable<SinhVien>{
    return this.httpClient.get<SinhVien>("https://localhost:7171/api/SinhViens/Get/" + maSV);
  }
  
  updateSinhVien(updateSinhVienRequest: SinhVien):  Observable<SinhVien>{
    return this.httpClient.put<SinhVien>("https://localhost:7171/api/SinhViens/Update", updateSinhVienRequest);
  }

  deleteSinhVien(maSV: string):  Observable<SinhVien> {
    return this.httpClient.delete<SinhVien>("https://localhost:7171/api/SinhViens/Delete/" + maSV);
  }

  importSinhVienData(sinhVienData: SinhVien[]): Observable<any> {
    return this.httpClient.post("https://localhost:7171/api/SinhViens/import", sinhVienData);
  }
  
  // Giao Vien 
  getGiaoViens(){
    return this.httpClient.get<GiaoVien[]>("https://localhost:7171/api/GiaoViens/Get");
  }

  addGiaoVien(addGiaoVienRequest: GiaoVien): Observable<GiaoVien>{
    addGiaoVienRequest.maGV = '';
    return this.httpClient.post<SinhVien>("https://localhost:7171/api/GiaoViens/Insert", addGiaoVienRequest);
  }

  getGiaoVien(maGV: string): Observable<SinhVien>{
    return this.httpClient.get<GiaoVien>("https://localhost:7171/api/GiaoViens/Get/" + maGV);
  }

  updateGiaoVien(updateGiaoVienRequest: GiaoVien):  Observable<GiaoVien>{
    return this.httpClient.put<GiaoVien>("https://localhost:7171/api/GiaoViens/Update", updateGiaoVienRequest);
  }
  deleteGiaoVien(maGV: string):  Observable<GiaoVien> {
    return this.httpClient.delete<SinhVien>("https://localhost:7171/api/GiaoViens/Delete/" + maGV);
  }
  getGiaoVienByMaGV(maGV: string){
    return this.httpClient.get<GiaoVien[]>("https://localhost:7171/api/GiaoViens/GetByPartialMaGV/partial/"+ maGV);
  }
  importGiaoVienData(giaoVienData: GiaoVien[]): Observable<any> {
    return this.httpClient.post("https://localhost:7171/api/GiaoViens/import", giaoVienData);
  }
  
  //User From 
  deleteUserForm(email: string): Observable<UserForm>{
    return this.httpClient.delete<UserForm>("https://localhost:7171/api/UserForms/Delete/" + email);
  }

  loginUserFrom(email: string, password: string): Observable<boolean>{
    return this.httpClient.get<boolean>("https://localhost:7171/api/UserForms/CheckLogin2/" + email + "/" + password);
  }
 
  login(loginRequest: any){
    loginRequest.name= '';
    loginRequest.user_type = '';
    return this.httpClient.post<any>("https://localhost:7171/api/UserForms/Login", loginRequest);
  }

  updateName(updateUserFormRequest: UserForm):  Observable<UserForm>{
    return this.httpClient.put<UserForm>("https://localhost:7171/api/UserForms/Update", updateUserFormRequest);
  }

  updatePass(email: string, updateUserFormRequest: UserForm):  Observable<UserForm>{
    return this.httpClient.put<UserForm>("https://localhost:7171/api/UserForms/update/" + email , updateUserFormRequest);
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }
  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token)
  }

  getfullNameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  getEmailFromToken(){
    if(this.userPayload)
    return this.userPayload.email;
  }

  hasRoles(requiredRoles: string[]): boolean {
    const userRoles = this.getRoleFromToken(); // Lấy các vai trò của người dùng từ token
    // Kiểm tra xem người dùng có tất cả các quyền cần thiết hay không
    return requiredRoles.every(role => userRoles.includes(role));
  }

  //Mon Hoc
  getMonHocs() {
    return this.httpClient.get<MonHoc[]>("https://localhost:7171/api/MonHocs/Get");
  }
  addMonHoc(addMonHocRequest: MonHoc): Observable<MonHoc>{
    return this.httpClient.post<MonHoc>("https://localhost:7171/api/MonHocs/Insert", addMonHocRequest);
  }
  getMonHoc(maMH: string): Observable<MonHoc>{
    return this.httpClient.get<MonHoc>("https://localhost:7171/api/MonHocs/Get/" + maMH);
  }
  checkMaMHExists(maMH: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/MonHocs/CheckIfMaMHTExists/" + maMH);
  }
  updateMonHoc(updateMonHocRequest: MonHoc):  Observable<MonHoc>{
    return this.httpClient.put<MonHoc>("https://localhost:7171/api/MonHocs/Update", updateMonHocRequest);
  }
  deleteMonHoc(maMH: string): Observable<MonHoc>{
    return this.httpClient.delete<MonHoc>("https://localhost:7171/api/MonHocs/Delete/" + maMH);
  }
  getMonHocByMaMH(maMH: string){
    return this.httpClient.get<MonHoc[]>("https://localhost:7171/api/MonHocs/GetByPartialMaMH/partial/"+ maMH);
  }

  //Lop Hoc Phan
  getLopHocPhans() {
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/KetQua2s/GetLopHocPhanMonHocInfoWithCount");
  }
  /*
  getLopHocPhans() {
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/LopHocPhans/GetLopHocPhanMonHocInfoWithCount");
  }
   */

  getLopHocPhanGiaoVien(maLHP: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/KetQua2s/GetLopHocPhanMonHocInfoWithCountSearch/partial/" + maLHP);
  }
  getLopHocPhanGiaoVien2(maLHP: string){
    return this.httpClient.get<LopHocPhan>("https://localhost:7171/api/KetQua2s/Get/" + maLHP);
  }
  /*
  getLopHocPhanGiaoVien(maLHP: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/LopHocPhans/GetLopHocPhanDetails/" + maLHP);
  }
   */
  
  getLopHocPhanSinhVien(maLHP: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/KetQua2s/GetKetQuaDetails/" + maLHP);
  }
  /*  
  getLopHocPhanSinhVien(maLHP: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/LopHocPhans/GetKetQuaDetails/" + maLHP);
  } 
  */
  addLopHocPhan(addLopHocPhanRequest: LopHocPhan): Observable<LopHocPhan>{
    return this.httpClient.post<LopHocPhan>("https://localhost:7171/api/LopHocPhans/Insert", addLopHocPhanRequest);
  }
  deleteLopHocPhan(maLHP: string): Observable<LopHocPhan>{
    return this.httpClient.delete<LopHocPhan>("https://localhost:7171/api/LopHocPhans/Delete/" + maLHP);
  }
  getLopHocPhanByMaLHP(maLHP: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/LopHocPhans/GetByPartialMaGV/partial/"+ maLHP);
  }

  checkMaLHPExists(maLHP: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/LopHocPhans/CheckIfMaLHPTExists/" + maLHP);
  }

  checkTimeGVExists(maGV: any, thu: string, gio: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/LopHocPhans/CheckTimeGV/" + maGV + "/" + thu + "/" + gio);
  }

  updateLopHocPhan(updateLopHocPhanRequest: LopHocPhan):  Observable<LopHocPhan>{
    return this.httpClient.put<LopHocPhan>("https://localhost:7171/api/LopHocPhans/Update", updateLopHocPhanRequest);
  }

  getLopHocPhansByMaGV(maGV: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/KetQua2s/GetLopHocPhanByMaGV/" + maGV);
  }
  /*
  getLopHocPhansByMaGV(maGV: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/LopHocPhans/GetLopHocPhanByMaGV/" + maGV);
  }
   */

  getKetQuaDetailsByStudent(maSV: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/KetQua2s/GetKetQuaDetailsByStudent/" + maSV);
  }
  /*
  getKetQuaDetailsByStudent(maSV: string){
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/LopHocPhans/GetKetQuaDetailsByStudent/" + maSV);
  }
   */

  getLopHocPhanMonHocGiaoVienInfo() {
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/KetQua2s/GetLopHocPhanMonHocInfoWithCount");
  }
  /*
  getLopHocPhanMonHocGiaoVienInfo() {
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/LopHocPhans/GetLopHocPhanMonHocGiaoVienInfo");
  }
   */

  getLopHocPhanMonHocGiaoVienInfoByPartial(maLHP: string) {
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/KetQua2s/GetLopHocPhanMonHocInfoWithCountSearch/partial/" + maLHP);
  }
  /*
  getLopHocPhanMonHocGiaoVienInfoByPartial(maLHP: string) {
    return this.httpClient.get<LopHocPhan[]>("https://localhost:7171/api/LopHocPhans/GetLopHocPhanMonHocGiaoVienInfoByPartial/partial/" + maLHP);
  }
   */

  // Cap Phep
  getCapPheps() {
    return this.httpClient.get<CapPhep[]>("https://localhost:7171/api/CapPheps/Get");
  }
  updateCapPhep(updateCapPhepRequest: CapPhep):  Observable<CapPhep>{
    return this.httpClient.put<CapPhep>("https://localhost:7171/api/CapPheps/Update", updateCapPhepRequest);
  }
  getCapPhep(maCP: string): Observable<CapPhep>{
    return this.httpClient.get<CapPhep>("https://localhost:7171/api/CapPheps/Get/" + maCP);
  }

  //Diem
  updateDiem(updateDiemRequest: KetQua):  Observable<CapPhep>{
    return this.httpClient.put<CapPhep>("https://localhost:7171/api/KetQua2s/Update", updateDiemRequest);
  }
  /*
  updateDiem(updateDiemRequest: KetQua):  Observable<CapPhep>{
    return this.httpClient.put<CapPhep>("https://localhost:7171/api/KetQuas/Update", updateDiemRequest);
  }
   */
  deleteKQua(maLHP: string,maSV: string): Observable<KetQua>{
    return this.httpClient.delete<KetQua>("https://localhost:7171/api/KetQua2s/DeleteKetQuaByMaLHPAndMaSV/"+ maLHP + "/" + maSV);
  }
  /*
  deleteKQua(maLHP: string,maSV: string): Observable<KetQua>{
    return this.httpClient.delete<KetQua>("https://localhost:7171/api/KetQuas/DeleteKetQuaByMaLHPAndMaSV/"+ maLHP + "/" + maSV);
  }
   */
  addKQua(addKQuaRequest: KetQua): Observable<KetQua>{
    return this.httpClient.post<KetQua>("https://localhost:7171/api/KetQua2s/Insert", addKQuaRequest);
  }
  /*
  addKQua(addKQuaRequest: KetQua): Observable<KetQua>{
    return this.httpClient.post<KetQua>("https://localhost:7171/api/KetQuas/Insert", addKQuaRequest);
  }
   */

  checkTimeSVExists(maSV: string, thu: string, gio: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/KetQua2s/ExistsLopHocPhanBySVThuGio/" + maSV + "/" + thu + "/" + gio);
  }
  /*
  checkTimeSVExists(maSV: string, thu: string, gio: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/KetQuas/ExistsLopHocPhanBySVThuGio/" + maSV + "/" + thu + "/" + gio);
  }
   */

  checkClassSVExists(maLHP: string, maSV: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/KetQua2s/ExistsKetQuaByMaLHPAndMaSV/" + maLHP + "/" + maSV);
  }
  /*
  checkClassSVExists(maLHP: string, maSV: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/KetQuas/ExistsKetQuaByMaLHPAndMaSV/" + maLHP + "/" + maSV);
  }
   */
  checkSubjectSVExists(maSV: string, maMH: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/KetQua2s/ExistsLopHocPhanBySVMaMH/" + maSV + "/" + maMH);
  }
  /*
  checkSubjectSVExists(maSV: string, maMH: string): Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/KetQuas/ExistsLopHocPhanBySVMaMH/" + maSV + "/" + maMH);
  }
   */

  checkSoLuongSV(maLHP: string):  Observable<boolean> {
    return this.httpClient.get<boolean>("https://localhost:7171/api/KetQua2s/IsSoLuongGreaterThanKetQuaCount/" + maLHP);
  }

  //Cmt 
  addCmt(cmtRequest: CMT_LHP): Observable<CMT_LHP>{
    return this.httpClient.post<CMT_LHP>("https://localhost:7171/api/CMT_LHPs/Insert", cmtRequest);
  }
  getCmts(maLHP: string) {
    console.log(maLHP);
    return this.httpClient.get<CMT_LHP[]>("https://localhost:7171/api/CMT_LHPs/GetByPartialMaLHP/partial/"+ maLHP);
  }
  getCMTs(maLHP: string){
    return this.httpClient.get<CMT_LHP[]>("https://localhost:7171/api/CMT_LHPs/GetByPartialMaLHP/partial/"+ maLHP);
  }

  //Thong Bao
  getNotifications(){
    return this.httpClient.get<ThongBao[]>("https://localhost:7171/api/ThongBaos/Get");
  }
  getNotification(maTB: string){
    return this.httpClient.get<ThongBao>("https://localhost:7171/api/ThongBaos/Get/"+ maTB);
  }
  getNotificationByTieuDe(tieuDe: string){
    return this.httpClient.get<ThongBao[]>("https://localhost:7171/api/ThongBaos/GetByPartialTieuDe/partial/"+ tieuDe);
  }
  addThongBao(thongbaoRequest: ThongBao): Observable<ThongBao>{
    return this.httpClient.post<ThongBao>("https://localhost:7171/api/ThongBaos/Insert", thongbaoRequest);
  }
  deleteThongBao(maTB: string): Observable<ThongBao>{
    return this.httpClient.delete<ThongBao>("https://localhost:7171/api/ThongBaos/Delete/" + maTB);
  }
  updateThongBao(updateThongBaoRequest: ThongBao):  Observable<ThongBao>{
    return this.httpClient.put<ThongBao>("https://localhost:7171/api/ThongBaos/Update", updateThongBaoRequest);
  }
}

