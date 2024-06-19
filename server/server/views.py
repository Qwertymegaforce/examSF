from django.shortcuts import render


def get_website(request):
    return render(request, "index.html")