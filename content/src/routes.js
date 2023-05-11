import React from 'react';

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));

const DataAdmin = React.lazy(() => import('./views/pages/admin/DataAdmin'));
const DetailAdmin = React.lazy(() => import('./views/pages/admin/DetailAdmin'));
const AddAdmin = React.lazy(() => import('./views/pages/admin/AddAdmin'));
const AddPeserta = React.lazy(() => import('./views/pages/data/AddPeserta'));

const DataPeserta = React.lazy(() => import('./views/pages/data/DataPeserta'));

const ChangePassword = React.lazy(() => import('./views/pages/setting/ChangePassword'));

const Claim = React.lazy(() => import('./views/pages/data/Claim'));
const ClaimRequest = React.lazy(() => import('./views/pages/data/ClaimRequest'));
const RequestClaim = React.lazy(() => import('./views/pages/data/RequestClaim'));

const UploadLampiran = React.lazy(() => import('./views/pages/data/UploadLampiran'));

const Approve = React.lazy(() => import('./views/pages/data/Approve'));
const Reject = React.lazy(() => import('./views/pages/data/Reject'));
const DetailPeserta = React.lazy(() => import('./views/pages/data/DetailPeserta'));
const UpdatePeserta = React.lazy(() => import('./views/pages/data/UpdatePeserta'));
const DetailPesertaClaim = React.lazy(() => import('./views/pages/data/DetailPesertaClaim'));
const AddUpload = React.lazy(() => import('./views/pages/data/AddUpload'));
const Pendidikan = React.lazy(() => import('./views/pages/pendidikan/Pendidikan'));
const AddPendidikan = React.lazy(() => import('./views/pages/pendidikan/AddPendidikan'));
const Perumahan = React.lazy(() => import('./views/pages/perumahan/Perumahan'));
const AddPerumahan = React.lazy(() => import('./views/pages/perumahan/AddPerumahan'));
const Kesehatan = React.lazy(() => import('./views/pages/kesehatan/Kesehatan'));
const AddKesehatan = React.lazy(() => import('./views/pages/kesehatan/AddKesehatan'));
const Berita = React.lazy(() => import('./views/pages/berita/Berita'));
const AddBerita = React.lazy(() => import('./views/pages/berita/AddBerita'));
const Galeri = React.lazy(() => import('./views/pages/galeri/Galeri'));
const AddGaleri = React.lazy(() => import('./views/pages/galeri/AddGaleri'));
const PrintTransfer = React.lazy(() => import('./views/pages/print/PrintTransfer'));
const DataTransfer = React.lazy(() => import('./views/pages/print/DataTransfer'));
const SingleTransfer = React.lazy(() => import('./views/pages/print/SingleTransfer'));

const Banner = React.lazy(() => import('./views/pages/banner/Banner'));
const AddBanner = React.lazy(() => import('./views/pages/banner/AddBanner'));
const Testimoni = React.lazy(() => import('./views/pages/testimoni/Testimoni'));
const AddTestimoni = React.lazy(() => import('./views/pages/testimoni/AddTestimoni'));
const Carousel = React.lazy(() => import('./views/pages/carousel/Carousel'));
const AddCarousel = React.lazy(() => import('./views/pages/carousel/AddCarousel'));
const Struktur = React.lazy(() => import('./views/pages/struktur/Struktur'));
const AddStruktur = React.lazy(() => import('./views/pages/struktur/AddStruktur'));
const Pesan = React.lazy(() => import('./views/pages/pesan/Pesan'));
const DetailPesan = React.lazy(() => import('./views/pages/pesan/DetailPesan'));

const routes = [
  {path: '/', exact: true, name: 'Home'},
  {path: '/change-password', exact: true, name: 'Change Password', component: ChangePassword},
  {path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
  {path: '/admin', exact: true, name: 'Data Admin', component: DataAdmin},
  {path: '/admin/add', exact: true, name: 'Tambah Admin', component: AddAdmin},
  {path: '/pesan', exact: true, name: 'Data Admin', component: Pesan},
  {path: '/pesan/:idPesan', exact: true, name: 'Tambah Admin', component: DetailPesan},
  {path: '/peserta/add/:nip', exact: true, name: 'Tambah Peserta', component: AddPeserta},
  {path: '/data', exact: true, name: 'Data Peserta', component: DataPeserta},
  {path: '/data/claim', exact: true, name: 'Pengajuan Peserta', component: Claim},
  {path: '/data/claim-request', exact: true, name: 'Pengajuan Peserta', component: ClaimRequest},
  {path: '/claim/:username', exact: true, name: 'Pengajuan Peserta', component: RequestClaim},
  {path: '/approve', exact: true, name: 'Approve', component: Approve},
  {path: '/approve/lampiran/:claimId/:userId/:kategoriClaim', exact: true, name: 'Lampiran', component: UploadLampiran},
  {path: '/reject', exact: true, name: 'Reject', component: Reject},
  {path: '/detail/:idAdmin', exact: true, name: 'Detail', component: DetailAdmin},
  {path: '/user/:idPeserta', exact: true, name: 'Detail', component: DetailPeserta},
  {path: '/update/:idPeserta', exact: true, name: 'Detail', component: UpdatePeserta},
  {path: '/claim-detail/:idClaim', exact: true, name: 'Detail', component: DetailPesertaClaim},
  {path: '/realisasi/pendidikan', exact: true, name: 'Pendidikan', component: Pendidikan},
  {path: '/realisasi/pendidikan/add', exact: true, name: 'Tambah Data Realisasi Pendidikan', component: AddPendidikan},
  {path: '/realisasi/perumahan', exact: true, name: 'Perumahan', component: Perumahan},
  {path: '/realisasi/perumahan/add', exact: true, name: 'Tambah Data Realisasi Perumahan', component: AddPerumahan},
  {path: '/realisasi/kesehatan', exact: true, name: 'Kesehatan', component: Kesehatan},
  {path: '/realisasi/kesehatan/add', exact: true, name: 'Tambah Data Realisasi Kesehatan', component: AddKesehatan},
  {path: '/berita', exact: true, name: 'Berita', component: Berita},
  {path: '/berita/add', exact: true, name: 'Tambah Berita', component: AddBerita},
  {path: '/banner', exact: true, name: 'Banner', component: Banner},
  {path: '/banner/add', exact: true, name: 'Tambah Banner', component: AddBanner},
  {path: '/testimoni', exact: true, name: 'Testimoni', component: Testimoni},
  {path: '/testimoni/add', exact: true, name: 'Tambah Testimoni', component: AddTestimoni},
  {path: '/carousel', exact: true, name: 'Banner', component: Carousel},
  {path: '/carousel/add', exact: true, name: 'Tambah Banner', component: AddCarousel},
  {path: '/struktur', exact: true, name: 'Struktur', component: Struktur},
  {path: '/struktur/add', exact: true, name: 'Tambah Struktur', component: AddStruktur},
  {path: '/galeri', exact: true, name: 'Galeri', component: Galeri},
  {path: '/galeri/add', exact: true, name: 'Tambah Galeri', component: AddGaleri},
  {path: '/upload/add', exact: true, name: 'Tambah Galeri', component: AddUpload},
  {path: '/transfer', exact: true, name: 'Transfer', component: PrintTransfer},
  {path: '/transfer/data', exact: true, name: 'Data Transfer', component: DataTransfer},
  {path: '/transfer/:transferId', exact: true, name: 'Data Transfer', component: SingleTransfer},
];

export default routes;
