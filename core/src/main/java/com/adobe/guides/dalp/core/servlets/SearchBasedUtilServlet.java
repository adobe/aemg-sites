package com.adobe.guides.dalp.core.servlets;

import com.adobe.guides.dalp.core.services.SearchBasedUtilService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.servlets.HttpConstants;
import org.apache.sling.api.servlets.SlingAllMethodsServlet;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component(service = Servlet.class,property = {"sling.servlet.methods="+ HttpConstants.METHOD_GET,
        "sling.servlet.resourceTypes="+ "/apps/search",
        "sling.servlet.extensions="+"json"})
public class SearchBasedUtilServlet extends SlingAllMethodsServlet {
    Logger logger= LoggerFactory.getLogger(this.getClass());

    @Reference
    SearchBasedUtilService searchBasedUtilService;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        try
        {
            String pagePath=request.getParameter("pagePath");
            String keyword= request.getParameter("keyword");

          //  List<Map<String, String>> getlst = searchBasedUtilService.getlst(pagePath, keyword);
            Gson gson = new GsonBuilder().setPrettyPrinting().create();
            String responseJson = gson.toJson(searchBasedUtilService.getlst(pagePath, keyword));
            response.getWriter().println(responseJson);
        }catch (Exception e)
        {
            logger.error("Exception in search based servlet :{}",e.getMessage());
        }

    }
}
