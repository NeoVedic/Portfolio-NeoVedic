import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/lib/auth";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Portfolio from "@/pages/Portfolio";
import Contact from "@/pages/Contact";
import Career from "@/pages/Career";
import Clients from "@/pages/Clients";
import HireResources from "@/pages/HireResources";
import FAQ from "@/pages/FAQ";
import Team from "@/pages/Team";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import WebDevelopment from "@/pages/services/WebDevelopment";
import DevOps from "@/pages/services/DevOps";
import Cloud from "@/pages/services/Cloud";
import Marketing from "@/pages/services/Marketing";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/pages/not-found";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLeads from "@/pages/admin/Leads";
import AdminJobApplications from "@/pages/admin/JobApplications";
import AdminBlogs from "@/pages/admin/Blogs";
import AdminPortfolio from "@/pages/admin/Portfolio";
import AdminTeam from "@/pages/admin/Team";
import AdminServices from "@/pages/admin/Services";
import AdminTestimonials from "@/pages/admin/Testimonials";
import AdminUsers from "@/pages/admin/Users";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/services" component={Services} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/contact" component={Contact} />
      <Route path="/career" component={Career} />
      <Route path="/faq" component={FAQ} />
      <Route path="/team" component={Team} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogDetail} />
      <Route path="/clients" component={Clients} />
      <Route path="/hire-resources" component={HireResources} />
      <Route path="/services/web-development" component={WebDevelopment} />
      <Route path="/services/devops" component={DevOps} />
      <Route path="/services/cloud" component={Cloud} />
      <Route path="/services/marketing" component={Marketing} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard">
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/leads">
        <ProtectedRoute>
          <AdminLeads />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/job-applications">
        <ProtectedRoute>
          <AdminJobApplications />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/blogs">
        <ProtectedRoute>
          <AdminBlogs />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/portfolio">
        <ProtectedRoute>
          <AdminPortfolio />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/team">
        <ProtectedRoute>
          <AdminTeam />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/services">
        <ProtectedRoute>
          <AdminServices />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/testimonials">
        <ProtectedRoute>
          <AdminTestimonials />
        </ProtectedRoute>
      </Route>
      <Route path="/admin/users">
        <ProtectedRoute>
          <AdminUsers />
        </ProtectedRoute>
      </Route>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
