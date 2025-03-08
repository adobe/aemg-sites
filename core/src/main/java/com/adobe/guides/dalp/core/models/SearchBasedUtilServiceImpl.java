package com.adobe.guides.dalp.core.models;

import com.adobe.guides.dalp.core.services.ResourceHelper;
import com.adobe.guides.dalp.core.services.ResourceHelper;
import com.adobe.guides.dalp.core.services.SearchBasedUtilService;
import org.apache.sling.api.resource.ResourceResolver;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.jcr.*;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;
import java.util.*;

@Component(service = SearchBasedUtilService.class,immediate = true)
public class SearchBasedUtilServiceImpl implements SearchBasedUtilService {

    @Reference
    ResourceHelper resourceHelper;

    Logger logger= LoggerFactory.getLogger(this.getClass());
    @Override
    public List<Map<String, String>> getlst(String path,String keyword) {
        ResourceResolver resourceResolver=null;
        Session session=null;
        List<Map<String,String>>lst=new ArrayList<>();


        try{
            resourceResolver = resourceHelper.getResourceResolver();
            session = resourceResolver.adaptTo(Session.class);
            int limit=10;
            QueryManager queryManager=session.getWorkspace().getQueryManager();
            StringBuilder stringBuilder=new StringBuilder();
            stringBuilder.append("SELECT * FROM [nt:base] AS s WHERE ISDESCENDANTNODE(["+path+"]) and CONTAINS(s.*, '"+keyword+"')");

            Query query= queryManager.createQuery(stringBuilder.toString(),Query.JCR_SQL2);
//            if(limit>0)
//            {
//                query.setLimit(limit);
//            }
            QueryResult queryResult= query.execute();
            Long totalSize= 0L;
          NodeIterator paginationIterator=  queryResult.getNodes();
          while (paginationIterator.hasNext())
          {
              paginationIterator.nextNode();
              totalSize++;
          }
            Map<String,String>paginationSize=new HashMap<>();
            paginationSize.put("totalCount",totalSize.toString());
            NodeIterator nodeIterator= queryResult.getNodes();
            if (nodeIterator.hasNext() == false) {
                return null;
            }
            else {
                while(nodeIterator.hasNext())
                {
                    Node node= nodeIterator.nextNode();
                    PropertyIterator iterator= node.getProperties();
                    Map<String,String>map=new HashMap<>();
                    while(iterator.hasNext())
                    {
                        Property property = iterator.nextProperty();
                        if(property.getName().equals("text")|| property.getName().equals("jcr:title") || property.getName().equals("formattedLastModifiedDate"))
                        {
                            String value= property.getValue().getString();
                            map.put(property.getName(), value);
                        }
                        map.put("path", node.getParent().getPath());
                    }
                    lst.add(map);
                }
                lst.add(paginationSize);
            }




        }catch (Exception e)
        {
            logger.error("Exception in serach based util : {}",e.getMessage());
        }

        return lst;
    }
}
