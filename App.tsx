import React, { useState } from 'react';
<<<<<<< HEAD
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
=======
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
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
<<<<<<< HEAD
import { PreOpListScreen } from './screens/PreOpListScreen';
import { Toast } from './components/Toast';
import { Doctor, Pharmacy, Laboratory, MedicineProfile, PathologyProfile, Article } from './types';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
=======
import { PreOpListScreen } from './screens/PreOpListScreen'; // New Import
import { Toast } from './components/Toast';
import { Doctor, Pharmacy, Laboratory, MedicineProfile, PathologyProfile, Article } from './types';
import { ProtectedRoute } from './components/ProtectedRoute';
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62

// Design System Showcase Component
import { ChevronLeft } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { DoctorCard } from './components/DoctorCard';
import { Banner } from './components/Banner';
import { Avatar } from './components/Avatar';

<<<<<<< HEAD
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
=======
const UIKitShowcase = ({ onBack }: { onBack: () => void }) => (
   <div className="min-h-screen bg-gray-bg p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50"><ChevronLeft/></button>
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


type ScreenState = 'splash' | 'welcome' | 'login' | 'role_select' | 'register' | 'review' | 'home' | 'doctor_dashboard' | 'pharmacy_dashboard' | 'lab_dashboard' | 'admin_login' | 'admin_dashboard' | 'chat' | 'doctors' | 'doctor_profile' | 'pharmacies' | 'pharmacy_profile' | 'labs' | 'lab_profile' | 'library_hub' | 'medicine_library' | 'medicine_detail' | 'pathology_library' | 'pathology_detail' | 'article_detail' | 'preop_list' | 'uikit';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('splash');
  const [selectedRole, setSelectedRole] = useState<'patient' | 'doctor' | 'pharmacy' | 'lab' | 'admin'>('patient');
  
  // Track authenticated user role (Public App)
  const [userRole, setUserRole] = useState<string | null>(null);

  // Track authenticated admin session (Private Internal App)
  const [adminSession, setAdminSession] = useState<{ role: 'master' | 'editor'; email: string } | null>(null);

>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [chatInitialMessage, setChatInitialMessage] = useState<string | undefined>(undefined);
  
<<<<<<< HEAD
  // Selection States (Keeping them for now as simple state, could be URL params later)
=======
  // Selection States
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
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

<<<<<<< HEAD
  // --- Auth Handlers ---
  const handleLoginSuccess = () => {
     setUserRole('patient');
     navigate('/home');
=======
  // Navigation Handlers
  const goBack = () => {
    if (currentScreen === 'register') setCurrentScreen('role_select');
    else if (currentScreen === 'role_select') setCurrentScreen('welcome');
    else if (currentScreen === 'login') setCurrentScreen('welcome');
    else if (currentScreen === 'admin_login') setCurrentScreen('welcome'); // Exit admin portal
    else if (currentScreen === 'uikit') setCurrentScreen('welcome');
    else if (currentScreen === 'chat') setCurrentScreen('home');
    else if (currentScreen === 'doctors') setCurrentScreen('home');
    else if (currentScreen === 'doctor_profile') setCurrentScreen('doctors');
    else if (currentScreen === 'pharmacies') setCurrentScreen('home');
    else if (currentScreen === 'pharmacy_profile') setCurrentScreen('pharmacies');
    else if (currentScreen === 'labs') setCurrentScreen('home');
    else if (currentScreen === 'lab_profile') setCurrentScreen('labs');
    else if (currentScreen === 'library_hub') setCurrentScreen('home');
    else if (currentScreen === 'medicine_library') setCurrentScreen('home'); // Now direct from Home
    else if (currentScreen === 'pathology_library') setCurrentScreen('home'); // Now direct from Home
    else if (currentScreen === 'medicine_detail') setCurrentScreen('medicine_library');
    else if (currentScreen === 'pathology_detail') setCurrentScreen('pathology_library');
    else if (currentScreen === 'article_detail') setCurrentScreen('home');
    else if (currentScreen === 'preop_list') setCurrentScreen('home');
  };

  // --- Public App Auth ---
  const handleLoginSuccess = () => {
     setUserRole('patient');
     setCurrentScreen('home');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleRegisterSuccess = (role: string) => {
    if (role === 'doctor') {
      setUserRole('doctor');
<<<<<<< HEAD
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
=======
      setCurrentScreen('doctor_dashboard');
    } else if (role === 'pharmacy') {
      setUserRole('pharmacy');
      setCurrentScreen('pharmacy_dashboard');
    } else if (role === 'lab') {
      setUserRole('lab');
      setCurrentScreen('lab_dashboard');
    } else if (role === 'patient') {
      setUserRole('patient');
      setCurrentScreen('home');
    } else {
      setCurrentScreen('review'); 
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('welcome');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
    setToastMessage("Has cerrado sesión correctamente");
    setShowToast(true);
  };

  // --- Internal Admin Auth ---
  const handleAdminLoginSuccess = () => {
<<<<<<< HEAD
    setAdminSession({ role: 'master', email: 'master@drgoyo.com' });
    navigate('/admin/dashboard');
=======
    // In a real app, validation happens on server.
    setAdminSession({ role: 'master', email: 'master@drgoyo.com' });
    setCurrentScreen('admin_dashboard');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleAdminLogout = () => {
    setAdminSession(null);
<<<<<<< HEAD
    navigate('/admin/login');
=======
    setCurrentScreen('admin_login');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
    setToastMessage("Sesión administrativa cerrada");
    setShowToast(true);
  };

  // --- Feature Navigation ---
  const handleNavigateToChat = (message?: string) => {
    setChatInitialMessage(message);
<<<<<<< HEAD
    navigate('/chat');
=======
    setCurrentScreen('chat');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleNavigateToDoctors = (openFilters = false, searchQuery = '', specialty = '') => {
    setOpenFiltersOnList(openFilters);
    setDoctorSearchQuery(searchQuery);
    setDoctorSpecialtyFilter(specialty);
<<<<<<< HEAD
    navigate('/doctors');
=======
    setCurrentScreen('doctors');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
<<<<<<< HEAD
    navigate('/doctor-profile');
=======
    setCurrentScreen('doctor_profile');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleNavigateToPharmacies = (searchQuery = '') => {
    setPharmacySearchQuery(searchQuery);
<<<<<<< HEAD
    navigate('/pharmacies');
=======
    setCurrentScreen('pharmacies');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleSelectPharmacy = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
<<<<<<< HEAD
    navigate('/pharmacy-profile');
  };

  const handleNavigateToLabs = () => {
    navigate('/labs');
=======
    setCurrentScreen('pharmacy_profile');
  };

  const handleNavigateToLabs = () => {
    setCurrentScreen('labs');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleSelectLab = (lab: Laboratory) => {
    setSelectedLab(lab);
<<<<<<< HEAD
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
=======
    setCurrentScreen('lab_profile');
  };

  // Library Navigation
  const handleNavigateToLibrary = () => {
    setCurrentScreen('library_hub');
  };

  const handleNavigateToMedicineLibrary = () => {
    setCurrentScreen('medicine_library');
  };

  const handleNavigateToPathologyLibrary = () => {
    setCurrentScreen('pathology_library');
  };

  const handleNavigateToPreOp = () => {
    setCurrentScreen('preop_list');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleSelectMedicine = (medicine: MedicineProfile) => {
    setSelectedMedicine(medicine);
<<<<<<< HEAD
    navigate('/medicine-detail');
=======
    setCurrentScreen('medicine_detail');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleSelectPathology = (pathology: PathologyProfile) => {
    setSelectedPathology(pathology);
<<<<<<< HEAD
    navigate('/pathology-detail');
=======
    setCurrentScreen('pathology_detail');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
<<<<<<< HEAD
    navigate('/article-detail');
=======
    setCurrentScreen('article_detail');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
  };

  // Centralized navigation handler for bottom bar
  const handleBottomNav = (tab: string) => {
<<<<<<< HEAD
    if (tab === 'home') navigate('/home');
=======
    if (tab === 'home') setCurrentScreen('home');
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
    else if (tab === 'doctors') handleNavigateToDoctors();
    else if (tab === 'chat') handleNavigateToChat();
    else if (tab === 'pharmacy') handleNavigateToPharmacies();
    else if (tab === 'labs') handleNavigateToLabs();
  };

<<<<<<< HEAD
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
=======
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onFinish={() => setCurrentScreen('welcome')} />;
      case 'welcome':
        return (
          <WelcomeScreen 
            onLogin={() => setCurrentScreen('login')} 
            onRegister={() => setCurrentScreen('role_select')} 
            onAdminAccess={() => setCurrentScreen('admin_login')} // Simulate accessing admin.drgoyo.com
          />
        );
      case 'login':
        return <LoginScreen onBack={goBack} onLoginSuccess={handleLoginSuccess} />;
      case 'role_select':
        return (
          <RoleSelectionScreen 
            onBack={goBack} 
            onSelectRole={(role) => {
              // Ensure generic user cannot select Admin here anymore
              if (role !== 'admin' as any) {
                setSelectedRole(role as any);
                setCurrentScreen('register');
              }
            }} 
          />
        );
      case 'register':
        return (
          <RegisterScreen 
            role={selectedRole} 
            onBack={goBack} 
            onSubmit={handleRegisterSuccess} 
          />
        );
      case 'review':
        return <AccountReviewScreen onGoHome={() => setCurrentScreen('welcome')} />;
      
      // Patient Routes
      case 'home':
        return (
          <ProtectedRoute 
            allowedRoles={['patient']} 
            currentRole={userRole || 'patient'} 
            onRedirect={() => setCurrentScreen('login')}
          >
            <PatientHomeScreen 
              onLogout={handleLogout} 
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
              onNavigateToChat={handleNavigateToChat} 
              onNavigateToMedicines={handleNavigateToMedicineLibrary}
              onNavigateToPathologies={handleNavigateToPathologyLibrary}
              onNavigateToPreOp={handleNavigateToPreOp}
              onNavigate={handleBottomNav}
            />
          </ProtectedRoute>
<<<<<<< HEAD
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
=======
        );
      
      // Dashboard Routes (Public App)
      case 'doctor_dashboard':
        return (
          <ProtectedRoute 
            allowedRoles={['doctor']} 
            currentRole={userRole || ''} 
            onRedirect={() => setCurrentScreen('login')}
          >
            <DoctorDashboardScreen onLogout={handleLogout} />
          </ProtectedRoute>
        );

      case 'pharmacy_dashboard':
        return (
          <ProtectedRoute 
            allowedRoles={['pharmacy']} 
            currentRole={userRole || ''} 
            onRedirect={() => setCurrentScreen('login')}
          >
            <PharmacyDashboardScreen onLogout={handleLogout} />
          </ProtectedRoute>
        );

      case 'lab_dashboard':
        return (
          <ProtectedRoute 
            allowedRoles={['lab']} 
            currentRole={userRole || ''} 
            onRedirect={() => setCurrentScreen('login')}
          >
            <LabDashboardScreen onLogout={handleLogout} />
          </ProtectedRoute>
        );
      
      // --- INTERNAL ADMIN ROUTES ---
      case 'admin_login':
        return (
          <AdminLoginScreen 
            onLoginSuccess={handleAdminLoginSuccess} 
            onBackToPublic={() => setCurrentScreen('welcome')} 
          />
        );

      case 'admin_dashboard':
        // Custom Protection Logic for Admin
        if (!adminSession || adminSession.role !== 'master') {
           // If accessing directly via code state without login
           return <AdminLoginScreen onLoginSuccess={handleAdminLoginSuccess} onBackToPublic={() => setCurrentScreen('welcome')} />;
        }
        return (
           <LibraryAdminScreen onLogout={handleAdminLogout} />
        );

      // Feature Routes
      case 'chat':
        return (
          <ChatScreen 
            initialMessage={chatInitialMessage} 
            onBack={goBack} 
            onViewDoctorList={(specialty) => handleNavigateToDoctors(false, '', specialty)}
          />
        );
      case 'doctors':
        return (
          <DoctorListScreen 
            onBack={goBack} 
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
            onSelectDoctor={handleSelectDoctor}
            initialOpenFilters={openFiltersOnList}
            onNavigate={handleBottomNav}
            initialSearchQuery={doctorSearchQuery}
            initialSpecialty={doctorSpecialtyFilter}
<<<<<<< HEAD
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

=======
            onNavigateToArticle={handleSelectArticle} // Connected
          />
        );
      case 'doctor_profile':
        return selectedDoctor ? (
          <DoctorProfileScreen 
            doctor={selectedDoctor} 
            onBack={goBack}
            onChat={() => handleNavigateToChat(`Hola, quisiera más información sobre una consulta con ${selectedDoctor.name}.`)}
            onNavigate={handleBottomNav}
          />
        ) : <div>Error loading doctor</div>;
      case 'pharmacies':
        return (
          <PharmacyListScreen 
            onBack={goBack}
            onSelectPharmacy={handleSelectPharmacy}
            onNavigate={handleBottomNav}
            initialSearchQuery={pharmacySearchQuery}
            onNavigateToArticle={handleSelectArticle} // Connected
          />
        );
      case 'pharmacy_profile':
        return selectedPharmacy ? (
          <PharmacyProfileScreen 
            pharmacy={selectedPharmacy}
            onBack={goBack}
            onChat={() => handleNavigateToChat(`Hola, quisiera preguntar sobre disponibilidad de medicamentos en ${selectedPharmacy.name}.`)}
            onNavigate={handleBottomNav}
          />
        ) : <div>Error loading pharmacy</div>;
      case 'labs':
        return (
          <LabListScreen 
             onBack={goBack}
             onSelectLab={handleSelectLab}
             onNavigate={handleBottomNav}
             onNavigateToArticle={handleSelectArticle} // Connected
          />
        );
      case 'lab_profile':
        return selectedLab ? (
          <LabProfileScreen 
            lab={selectedLab}
            onBack={goBack}
            onChat={() => handleNavigateToChat(`Hola, quisiera información sobre los exámenes en ${selectedLab.name}.`)}
            onNavigate={handleBottomNav}
          />
        ) : <div>Error loading lab</div>;
        
      // Library Routes
      case 'library_hub':
        return (
          <LibraryHubScreen 
            onBack={goBack}
            onNavigateToMedicines={handleNavigateToMedicineLibrary}
            onNavigateToPathologies={handleNavigateToPathologyLibrary}
            onNavigate={handleBottomNav}
          />
        );
      case 'medicine_library':
        return (
          <MedicineLibraryScreen 
            onBack={goBack}
            onSelectMedicine={handleSelectMedicine}
            onNavigate={handleBottomNav}
          />
        );
      case 'medicine_detail':
        return selectedMedicine ? (
          <MedicineDetailScreen 
            medicine={selectedMedicine}
            onBack={goBack}
            onFindInPharmacies={handleNavigateToPharmacies}
            onNavigate={handleBottomNav}
          />
        ) : <div>Error loading medicine</div>;
      case 'pathology_library':
        return (
          <PathologyLibraryScreen 
            onBack={goBack}
            onSelectPathology={handleSelectPathology}
            onNavigate={handleBottomNav}
          />
        );
      case 'pathology_detail':
        return selectedPathology ? (
          <PathologyDetailScreen 
            pathology={selectedPathology}
            onBack={goBack}
            onConsultDoctors={(specialty) => handleNavigateToDoctors(false, '', specialty)}
            onNavigate={handleBottomNav}
          />
        ) : <div>Error loading pathology</div>;

      // New Article Detail Route
      case 'article_detail':
        return selectedArticle ? (
          <ArticleDetailScreen
            article={selectedArticle}
            onBack={goBack}
            onNavigate={handleBottomNav}
          />
        ) : <div>Error loading article</div>;
        
      case 'preop_list':
        return (
           <PreOpListScreen 
              onBack={goBack}
              onNavigate={handleBottomNav}
           />
        );

      case 'uikit':
        return <UIKitShowcase onBack={() => setCurrentScreen('welcome')} />;
      default:
        return <div>Error: Screen not found</div>;
    }
  };

  return (
    <>
      {renderScreen()}
>>>>>>> 2013d9c2c3592bdb0dc6c432734c88095d88fe62
      <Toast 
        message={toastMessage} 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </>
  );
};

export default App;