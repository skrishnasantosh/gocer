from django.db import models
import json
import types

# Create your models here.

class Organization(models.Model):
    orgid       = models.CharField (max_length=60, null = False, primary_key=True, db_column="id")
    orgname     = models.CharField(max_length=128, null = False, db_column="name")
    street      = models.CharField(max_length=128, null = False)
    country     = models.CharField(max_length=128, null = False)    
    province    = models.CharField(max_length=128, null = False)
    city        = models.CharField(max_length=128, null = False)
    zipcode     = models.CharField(max_length=128, null = False)
    latitude    = models.FloatField(null = False)
    longitude   = models.FloatField(null = False)
    category    = models.CharField(max_length = 128, null = True)
    rating      = models.FloatField(null = True)
    logoimage   = models.CharField(max_length=512, null = True)

    def __str__(self):
        o = {'id' : self.orgid,
            'name' : self.orgname,
            'street' : self.street,
            'country' : self.country,
            'province' : self.province,
            'city' : self.city,
            'zipcode' : self.zipcode,
            'latitude' : self.latitude,
            'longitude' : self.longitude,
            'category' : self.category,
            'rating' : self.rating,
            'logoimage' : self.logoimage}

        return json.dumps(o)