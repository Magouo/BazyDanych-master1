from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from .models import Mieszkaniec, Uchwala, Harmonogram, Usterka, Licznik, Rozliczenie
from .serializers import MieszkaniecSerializer, UchwalaSerializer, HarmonogramSerializer, UsterkaSerializer, LicznikSerializer, RozliczenieSerializer
from .permissions import IsAdminOrReadOnly

class CreateMieszkaniecView(generics.CreateAPIView):
    """
    Tworzy nowego mieszkańca.
    Dostęp: Publiczny (AllowAny).
    """
    queryset = Mieszkaniec.objects.all()
    serializer_class = MieszkaniecSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        user = serializer.save()
        Token.objects.create(user=user)

class MieszkaniecViewSet(viewsets.ModelViewSet):
    """
    Zarządza mieszkańcami.
    - Odczyt: Dostęp dla wszystkich uwierzytelnionych użytkowników.
    - Edycja: Dostęp tylko dla administratorów (superuserów).
    """
    queryset = Mieszkaniec.objects.all()
    serializer_class = MieszkaniecSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Mieszkaniec.objects.all()
        return Mieszkaniec.objects.filter(id=user.id)

class UchwalaViewSet(viewsets.ModelViewSet):
    """
    Zarządza uchwałami.
    - Odczyt: Dostęp dla wszystkich uwierzytelnionych użytkowników.
    - Edycja: Dostęp tylko dla administratorów (superuserów).
    """
    queryset = Uchwala.objects.all()
    serializer_class = UchwalaSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

class HarmonogramViewSet(viewsets.ModelViewSet):
    """
    Zarządza harmonogramami.
    - Odczyt: Dostęp dla wszystkich uwierzytelnionych użytkowników.
    - Edycja: Dostęp tylko dla administratorów (superuserów).
    """
    queryset = Harmonogram.objects.all()
    serializer_class = HarmonogramSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

class UsterkaListCreateView(generics.ListCreateAPIView):
    """
    Zarządza usterkami.
    - Odczyt: Dostęp tylko dla zalogowanego użytkownika.
    - Tworzenie: Dostęp dla wszystkich uwierzytelnionych użytkowników.
    """
    serializer_class = UsterkaSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Usterka.objects.all()
        return Usterka.objects.filter(mieszkaniec=user)

class UsterkaAdminView(generics.ListAPIView):
    """
    Zarządza usterkami dla administratorów.
    - Odczyt: Dostęp tylko dla administratorów (superuserów).
    """
    queryset = Usterka.objects.all()
    serializer_class = UsterkaSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

class LicznikViewSet(viewsets.ModelViewSet):
    """
    Zarządza licznikami.
    - Odczyt: Dostęp dla wszystkich uwierzytelnionych użytkowników.
    - Edycja: Dostęp tylko dla administratorów (superuserów).
    """
    queryset = Licznik.objects.all()
    serializer_class = LicznikSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Licznik.objects.all()
        return Licznik.objects.filter(mieszkaniec=user)

class RozliczeniaViewSet(viewsets.ModelViewSet):
    """
    Zarządza rozliczeniami.
    - Odczyt: Dostęp dla wszystkich uwierzytelnionych użytkowników.
    - Edycja: Dostęp tylko dla administratorów (superuserów).
    """
    queryset = Rozliczenie.objects.all()
    serializer_class = RozliczenieSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Rozliczenie.objects.all()
        return Rozliczenie.objects.filter(mieszkaniec=user)
class UpdateContactInfoView(generics.UpdateAPIView):
    """
    Aktualizuje dane kontaktowe mieszkańca.
    - Edycja: Dostęp dla wszystkich uwierzytelnionych użytkowników.
    """
    queryset = Mieszkaniec.objects.all()
    serializer_class = MieszkaniecSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]