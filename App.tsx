import React, { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { SplashScreen } from './screens/SplashScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RoleSelectionScreen } from './screens/RoleSelectionScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { AccountReviewScreen } from './screens/AccountReviewScreen';
import { PatientHomeScreen } from './screens/PatientHomeScreen';
import { DoctorDashboardScreen } from './screens/DoctorDashboardScreen';
import { PharmacyDashboardScreen } from './screens/PharmacyDashboardScreen';
import { LabDashboardScreen } from './screens/LabDashboardScreen';
import { ChatScreen } from './screens/ChatScreen';
import { DoctorListScreen } from './screens/DoctorListScreen';
import { DoctorProfileScreen } from './screens/DoctorProfileScreen';
import { PharmacyListScreen } from './screens/PharmacyListScreen';
import { PharmacyProfileScreen } from './screens/PharmacyProfileScreen';
import { LabListScreen } from './screens/LabListScreen';
import { LabProfileScreen } from './screens/LabProfileScreen';
import { MedicineLibraryScreen } from './screens/MedicineLibraryScreen';
import { MedicineDetailScreen } from './screens/MedicineDetailScreen';
import { LibraryHubScreen } from './screens/LibraryHubScreen';
import { PathologyLibraryScreen } from './screens/PathologyLibraryScreen';
import { PathologyDetailScreen } from './screens/PathologyDetailScreen';
import { LibraryAdminScreen } from './screens/LibraryAdminScreen';
import { AdminLoginScreen } from './screens/AdminLoginScreen';
import { ArticleDetailScreen } from './screens/ArticleDetailScreen';
import { PreOpListScreen } from './screens/PreOpListScreen';
import { Toast } from './components/Toast';
import { Doctor, Pharmacy, Laboratory, MedicineProfile, PathologyProfile, Article } from './types';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Design System Showcase Component
import { ChevronLeft } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { DoctorCard } from './components/DoctorCard';
import { Banner } from './components/Banner';
import { Avatar } from './components/Avatar';

const UIKitShowcase = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-gray-bg p-4 md:p-8">
           <div className="max-w-5xl mx-auto space-y-12">
             <div className="flex justify-between items-center">
               <div className="flex items-center gap-4">
                 <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"><ChevronLeft/></button>
                 <div>
                   <h1 className="font-heading text-3xl font-bold text-secondary">Dr. Goyo</h1>
                   <p className="text-gray-500 mt-1">Design System & Dashboard (Demo)</p>
                 </div>
               </div>
               <Avatar src="https://picsum.photos/200/200" alt="User" status="online" size="md" />
             </div>
     
             {/* Simplified preview of components */}
             <div className="grid md:grid-cols-2 gap-8">
                <Banner title="Bienvenido Paciente" subtitle="Tienes una cita próxima mañana a las 9:00 AM" type="premium" />
                <div className="bg-white p-6 rounded-2xl shadow-soft">
                   <h3 className="font-heading font-semibold mb-4">Buscar Especialista</h3>
                   <SearchBar />
                </div>
             </div>
     
             <section>
               <h2 className="font-heading text-xl font-semibold text-gray-800 mb-4">Doctores Recomendados</h2>
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <DoctorCard 
                    doctor={{ 
                      id: '1', 
                      name: 'Dr. Alejandro Goyo', 
                      specialty: 'Cardiólogo', 
                      rating: 4.9, 
                      reviews: 120, 
                      image: 'https://picsum.photos/200/300', 
                      distance: '1.2 km', 
                      location: 'Caracas',
                      price: 80,
                      nextAvailable: 'Hoy' 
                    }} 
                   />
               </div>
             </section>
           </div>
        </div>
     );
};


const App: React.FC = () => {
  const navigate = useNavigate();
  const { userRole, setUserRole, adminSession, setAdminSession, logout } = useAuth();

  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'pharmacy' | 'lab' | 'admin'>('patient');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>(undefined);
  
  // Selection States
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [selectedLab, setSelectedLab] = useState<Laboratory | null>(null);
  const [selectedMedicine, setSelectedMedicine] = useState<MedicineProfile | null>(null);
  const [selectedPathology, setSelectedPathology] = useState<PathologyProfile | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Filter Props
  const [openFiltersOnList, setOpenFiltersOnList] = useState(false);
  const [pharmacySearchQuery, setPharmacySearchQuery] = useState('');
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [doctorSpecialtyFilter, setDoctorSpecialtyFilter] = useState('');

  // --- Auth Handlers ---
  const handleLoginSuccess = () => {
     setUserRole('patient');
     navigate('/home');
  };

  const handleRegisterSuccess = (role: string) => {
    if (role === 'doctor') {
      setUserRole('doctor');
      navigate('/doctor/dashboard');
    } else if (role === 'pharmacy') {
      setUserRole('pharmacy');
      navigate('/pharmacy/dashboard');
    } else if (role === 'lab') {
      setUserRole('lab');
      navigate('/lab/dashboard');
    } else if (role === 'patient') {
      setUserRole('patient');
      navigate('/home');
    } else {
      navigate('/review'); 
    }
  };

  const handleAppLogout = () => {
    logout();
    navigate('/welcome');
    setToastMessage("Has cerrado sesión correctamente");
    setShowToast(true);
  };

  // --- Internal Admin Auth ---
  const handleAdminLoginSuccess = () => {
    setAdminSession({ role: 'master', email: 'master@drgoyo.com' });
    navigate('/admin/dashboard');
  };

  const handleAdminLogout = () => {
    setAdminSession(null);
    navigate('/admin/login');
    setToastMessage("Sesión administrativa cerrada");
    setShowToast(true);
  };

  // --- Feature Navigation ---
  const handleNavigateToChat = (message?: string) => {
    setChatInitialMessage(message);
    navigate('/chat');
  };

  const handleNavigateToDoctors = (openFilters = false, searchQuery = '', specialty = '') => {
    setOpenFiltersOnList(openFilters);
    setDoctorSearchQuery(searchQuery);
    setDoctorSpecialtyFilter(specialty);
    navigate('/doctors');
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    navigate('/doctor-profile');
  };

  const handleNavigateToPharmacies = (searchQuery = '') => {
    setPharmacySearchQuery(searchQuery);
    navigate('/pharmacies');
  };

  const handleSelectPharmacy = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    navigate('/pharmacy-profile');
  };

  const handleNavigateToLabs = () => {
    navigate('/labs');
  };

  const handleSelectLab = (lab: Laboratory) => {
    setSelectedLab(lab);
    navigate('/lab-profile');
  };

  // Library Navigation
  const handleNavigateToMedicineLibrary = () => {
    navigate('/medicine-library');
  };

  const handleNavigateToPathologyLibrary = () => {
    navigate('/pathology-library');
  };

  const handleNavigateToPreOp = () => {
    navigate('/preop');
  };

  const handleSelectMedicine = (medicine: MedicineProfile) => {
    setSelectedMedicine(medicine);
    navigate('/medicine-detail');
  };

  const handleSelectPathology = (pathology: PathologyProfile) => {
    setSelectedPathology(pathology);
    navigate('/pathology-detail');
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    navigate('/article-detail');
  };

  // Centralized navigation handler for bottom bar
  const handleBottomNav = (tab: string) => {
    if (tab === 'home') navigate('/home');
    else if (tab === 'doctors') handleNavigateToDoctors();
    else if (tab === 'chat') handleNavigateToChat();
    else if (tab === 'pharmacy') handleNavigateToPharmacies();
    else if (tab === 'labs') handleNavigateToLabs();
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreen onFinish={() => navigate('/welcome')} />} />
        <Route path="/welcome" element={
          <WelcomeScreen 
            onLogin={() => navigate('/login')} 
            onRegister={() => navigate('/role-selection')} 
            onAdminAccess={() => navigate('/admin/login')} 
          />
        } />
        <Route path="/login" element={<LoginScreen onBack={() => navigate(-1)} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/role-selection" element={
          <RoleSelectionScreen 
            onBack={() => navigate(-1)} 
            onSelectRole={(role) => {
              if (role !== 'admin' as any) {
                setSelectedRole(role as any);
                navigate('/register');
              }
            }} 
          />
        } />
        <Route path="/register" element={<RegisterScreen role={selectedRole} onBack={() => navigate(-1)} onSubmit={handleRegisterSuccess} />} />
        <Route path="/review" element={<AccountReviewScreen onGoHome={() => navigate('/welcome')} />} />
        
        {/* Patient Routes */}
        <Route path="/home" element={
          <ProtectedRoute allowedRoles={['patient']}>
            <PatientHomeScreen 
              onLogout={handleAppLogout} 
              onNavigateToChat={handleNavigateToChat} 
              onNavigateToMedicines={handleNavigateToMedicineLibrary}
              onNavigateToPathologies={handleNavigateToPathologyLibrary}
              onNavigateToPreOp={handleNavigateToPreOp}
              onNavigate={handleBottomNav}
            />
          </ProtectedRoute>
        } />

        {/* Dashboards */}
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorDashboardScreen onLogout={handleAppLogout} />
          </ProtectedRoute>
        } />
        <Route path="/pharmacy/dashboard" element={
          <ProtectedRoute allowedRoles={['pharmacy']}>
            <PharmacyDashboardScreen onLogout={handleAppLogout} />
          </ProtectedRoute>
        } />
        <Route path="/lab/dashboard" element={
          <ProtectedRoute allowedRoles={['lab']}>
            <LabDashboardScreen onLogout={handleAppLogout} />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLoginScreen onLoginSuccess={handleAdminLoginSuccess} onBackToPublic={() => navigate('/welcome')} />} />
        <Route path="/admin/dashboard" element={
          (!adminSession || adminSession.role !== 'master') 
            ? <Navigate to="/admin/login" replace />
            : <LibraryAdminScreen onLogout={handleAdminLogout} />
        } />

        {/* Feature Routes */}
        <Route path="/chat" element={
          <ChatScreen 
            initialMessage={chatInitialMessage} 
            onBack={() => navigate(-1)} 
            onViewDoctorList={(specialty) => handleNavigateToDoctors(false, '', specialty)}
          />
        } />
        <Route path="/doctors" element={
          <DoctorListScreen 
            onBack={() => navigate(-1)} 
            onSelectDoctor={handleSelectDoctor}
            initialOpenFilters={openFiltersOnList}
            onNavigate={handleBottomNav}
            initialSearchQuery={doctorSearchQuery}
            initialSpecialty={doctorSpecialtyFilter}
            onNavigateToArticle={handleSelectArticle}
          />
        } />
        <Route path="/doctor-profile" element={
          selectedDoctor ? (
            <DoctorProfileScreen 
              doctor={selectedDoctor} 
              onBack={() => navigate(-1)}
              onChat={() => handleNavigateToChat(`Hola, quisiera más información sobre una consulta con ${selectedDoctor.name}.`)}
              onNavigate={handleBottomNav}
            />
          ) : <Navigate to="/doctors" replace />
        } />
        <Route path="/pharmacies" element={
          <PharmacyListScreen 
            onBack={() => navigate(-1)}
            onSelectPharmacy={handleSelectPharmacy}
            onNavigate={handleBottomNav}
            initialSearchQuery={pharmacySearchQuery}
            onNavigateToArticle={handleSelectArticle}
          />
        } />
        <Route path="/pharmacy-profile" element={
          selectedPharmacy ? (
            <PharmacyProfileScreen 
              pharmacy={selectedPharmacy}
              onBack={() => navigate(-1)}
              onChat={() => handleNavigateToChat(`Hola, quisiera preguntar sobre disponibilidad de medicamentos en ${selectedPharmacy.name}.`)}
              onNavigate={handleBottomNav}
            />
          ) : <Navigate to="/pharmacies" replace />
        } />
        <Route path="/labs" element={
          <LabListScreen 
             onBack={() => navigate(-1)}
             onSelectLab={handleSelectLab}
             onNavigate={handleBottomNav}
             onNavigateToArticle={handleSelectArticle}
          />
        } />
        <Route path="/lab-profile" element={
          selectedLab ? (
            <LabProfileScreen 
              lab={selectedLab}
              onBack={() => navigate(-1)}
              onChat={() => handleNavigateToChat(`Hola, quisiera información sobre los exámenes en ${selectedLab.name}.`)}
              onNavigate={handleBottomNav}
            />
          ) : <Navigate to="/labs" replace />
        } />

        {/* Library Routes */}
        <Route path="/medicine-library" element={
          <MedicineLibraryScreen 
            onBack={() => navigate(-1)}
            onSelectMedicine={handleSelectMedicine}
            onNavigate={handleBottomNav}
          />
        } />
        <Route path="/medicine-detail" element={
          selectedMedicine ? (
            <MedicineDetailScreen 
              medicine={selectedMedicine}
              onBack={() => navigate(-1)}
              onFindInPharmacies={handleNavigateToPharmacies}
              onNavigate={handleBottomNav}
            />
          ) : <Navigate to="/medicine-library" replace />
        } />
        <Route path="/pathology-library" element={
          <PathologyLibraryScreen 
            onBack={() => navigate(-1)}
            onSelectPathology={handleSelectPathology}
            onNavigate={handleBottomNav}
          />
        } />
        <Route path="/pathology-detail" element={
          selectedPathology ? (
            <PathologyDetailScreen 
              pathology={selectedPathology}
              onBack={() => navigate(-1)}
              onConsultDoctors={(specialty) => handleNavigateToDoctors(false, '', specialty)}
              onNavigate={handleBottomNav}
            />
          ) : <Navigate to="/pathology-library" replace />
        } />
        <Route path="/article-detail" element={
          selectedArticle ? (
            <ArticleDetailScreen
              article={selectedArticle}
              onBack={() => navigate(-1)}
              onNavigate={handleBottomNav}
            />
          ) : <Navigate to="/home" replace />
        } />
        <Route path="/preop" element={
           <PreOpListScreen 
              onBack={() => navigate(-1)}
              onNavigate={handleBottomNav}
           />
        } />
        <Route path="/uikit" element={<UIKitShowcase />} />
      </Routes>

      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  );
};

export default App;