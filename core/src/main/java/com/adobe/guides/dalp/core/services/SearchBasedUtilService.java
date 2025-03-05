package com.adobe.guides.dalp.core.services;

import java.util.List;
import java.util.Map;

public interface SearchBasedUtilService {
    List<Map<String,String>> getlst(String path,String keyword);
}
