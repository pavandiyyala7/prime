from django.views.decorators.csrf import csrf_exempt

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser

from .models import  Department, Company, Employee
from .serializers import  DepartmentSerializer, CompanySerializer, EmployeeSerializer,UserSerializer,RegisterSerializer,LoginSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status,generics

from django.contrib.auth import authenticate
from django.shortcuts import render
from django.contrib.auth.models import User 

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    authentication_classes = []  # Disable authentication check for login endpoint
    permission_classes = []  # Allow anyone to access

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)
            return Response({
                'refresh':str(refresh),
                'access': str(refresh.access_token),
                'user': user_serializer.data
            })
        else:
            return Response({'detail':'Invalid credentials'}, status=401)

class DashboardView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        return Response({
            'message' == 'welcome to dashboard',
            'user' == user_serializer.data,
        },200)

@csrf_exempt
def DepartmentApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            try:
                department = Department.objects.get(id=id)
                serializer = DepartmentSerializer(department)
                return JsonResponse(serializer.data, safe=False)
            except Department.DoesNotExist:
                return JsonResponse({"error": "Department Not Found"}, status=404)
        else:
            departments = Department.objects.all()
            serializer = DepartmentSerializer(departments, many=True)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        department_data = JSONParser().parse(request)
        serializer = DepartmentSerializer(data=department_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        try:
            department = Department.objects.get(id=department_data['id'])
        except Department.DoesNotExist:
            return JsonResponse("Department Not Found", safe=False)

        serializer = DepartmentSerializer(department, data=department_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)

    elif request.method == 'DELETE':
        try:
            department = Department.objects.get(id=id)
            department.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        except Department.DoesNotExist:
            return JsonResponse("Department Not Found", safe=False)


@csrf_exempt
def CompanyApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            try:
                company = Company.objects.get(id=id)
                serializer = CompanySerializer(company)
                return JsonResponse(serializer.data, safe=False)
            except Company.DoesNotExist:
                return JsonResponse({"error": "Company Not Found"}, status=404)
        else:
            companies = Company.objects.all()
            serializer = CompanySerializer(companies, many=True)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        company_data = JSONParser().parse(request)
        serializer = CompanySerializer(data=company_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)

    elif request.method == 'PUT':
        company_data = JSONParser().parse(request)
        try:
            company = Company.objects.get(id=company_data['id'])
        except Company.DoesNotExist:
            return JsonResponse("Company Not Found", safe=False)

        serializer = CompanySerializer(company, data=company_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)

    elif request.method == 'DELETE':
        try:
            company = Company.objects.get(id=id)
            company.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        except Company.DoesNotExist:
            return JsonResponse("Company Not Found", safe=False)


@csrf_exempt
def EmployeeApi(request, id=0):
    if request.method == 'GET':
        if id != 0:
            try:
                employee = Employee.objects.get(id=id)
                serializer = EmployeeSerializer(employee)
                return JsonResponse(serializer.data, safe=False)
            except Employee.DoesNotExist:
                return JsonResponse({"error": "Employee Not Found"}, status=404)
        else:
            employees = Employee.objects.all()
            serializer = EmployeeSerializer(employees, many=True)
            return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        try:
            employee_data = JSONParser().parse(request)  
            serializer = EmployeeSerializer(data=employee_data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({"message": "Employee added successfully"}, status=201)
            else:
                return JsonResponse({"error": serializer.errors}, status=400)

        except Exception as e:
            return JsonResponse({"error": "Failed to add employee: {str(e)}"}, status=500)

    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        try:
            employee = Employee.objects.get(id=employee_data['id'])
        except Employee.DoesNotExist:
            return JsonResponse("Employee Not Found", safe=False)

        serializer = EmployeeSerializer(employee, data=employee_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)

    elif request.method == 'DELETE':
        try:
            employee = Employee.objects.get(id=id)
            employee.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        except Employee.DoesNotExist:
            return JsonResponse("Employee Not Found", safe=False)

