from rest_framework.pagination import PageNumberPagination

class HabitoPagination(PageNumberPagination):
    page_size = 20 #Este atributo me indica el numero de habitos que voy a obtener por pagina
    page_size_query_param = 'page_size' #Con este atributo puedo cambiar la cantidad de habitos que veo en lugar de los por defecto 
    page_query_param = 'page' #en la url puedo pasar a otra pagina por ejemplo ?page_size=2
    max_page_size = 50