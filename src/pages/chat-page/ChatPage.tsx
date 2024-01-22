import React, {useEffect, useState} from "react";
import { useHttpRequestService } from "../../service/HttpRequestService";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/user";
import { useNavigate } from "react-router-dom";