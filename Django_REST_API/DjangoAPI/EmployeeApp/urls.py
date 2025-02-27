from django.urls import path, re_path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.contrib import admin

urlpatterns = [

    path('login/', views.LoginView.as_view(), name='auth_login'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dashboard/', views.DashboardView.as_view(), name='dashboard'),

    path('department/', views.DepartmentApi),
    re_path(r'^department/([0-9]+)$', views.DepartmentApi),

    path('employee/', views.EmployeeApi),
    re_path('^employee/([0-9]+)$', views.EmployeeApi),

    path('company/', views.CompanyApi),
    re_path(r'^company/([0-9]+)$', views.CompanyApi),

]
