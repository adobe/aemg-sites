package com.adobe.guides.dalp.core.services;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;

public interface ResourceHelper {
    public ResourceResolver getResourceResolver() throws LoginException;
}
