package com.adobe.guides.dalp.core.models;

import java.util.HashMap;
import java.util.Map;

import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ResourceResolverFactory;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.guides.dalp.core.constants.UserManagementConstants;
import com.adobe.guides.dalp.core.services.ResourceHelper;

@Component(service = ResourceHelper.class, immediate = true)
public class ResourceHelperImpl implements ResourceHelper {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	@Reference
	ResourceResolverFactory resResolverFactory;

	@Override
	public ResourceResolver getResourceResolver() throws LoginException {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put(ResourceResolverFactory.SUBSERVICE, UserManagementConstants.SUB_SERVICE);
			ResourceResolver resourceResolver = resResolverFactory.getServiceResourceResolver(map);
			logger.error("resourceResolver" + resourceResolver);
			return resourceResolver;
		} catch (Exception e) {
			logger.error("error on resource" + e.getMessage());
		}
		return null;
	}

}
