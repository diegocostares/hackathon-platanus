"""
Schemas for the FrostAway API

This file contains all the schemas used in the FrostAway API, including schemas for
Guardian Zones, Guardian Position Data, Guardian Telemetry Data, Guardian Alerts,
and Control Methods.
"""

from datetime import datetime
from typing import List, Optional

from ninja import Field, Router, Schema
from ninja.constants import NOT_SET
from pydantic import EmailStr, validator

# ----------------------- Users Schemas -----------------------


# class UserSchema(Schema):
#     id: int = Field(..., example=1)
#     username: str = Field(..., example="user123")
#     email: EmailStr = Field(..., example="user123@gmail.com")
#     role: str = Field(..., example="caretaker")
