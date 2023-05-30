"""De- and encoding of addresses and geolocations."""
import certifi
import ssl
import geopy.geocoders
from geopy.geocoders import Nominatim
from typing import Protocol


CTX = ssl.create_default_context(cafile=certifi.where())
geopy.geocoders.options.default_ssl_context = CTX


class Address(Protocol):
    street: str
    zip: str
    city: str
    country: str


def address_to_geolocation(address: Address) -> tuple[float, float]:
    """Converts an address to a tuple of latitude and longitude."""
    geolocator = Nominatim(user_agent='tafel_operations_app')
    geocode = geolocator.geocode(query=f"{address.street}, {address.zip} {address.city}, {address.country}")
    if geocode is not None:
        return geocode.latitude, geocode.longitude
    else:
        return 0, 0
