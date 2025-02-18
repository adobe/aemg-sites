package com.adobe.guides.dalp.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;
import com.day.cq.wcm.api.Page;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.apache.commons.io.IOUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.jcr.Binary;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Dimple.Baroliya on 30-09-2024.
 * @project aem-guides-project
 */

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        adapters = {GuidesTOC.class, ComponentExporter.class},
        resourceType = {"aemguidesDALP/components/sites-components/guides-toc",}
)
@Exporter(
        name = "jackson",
        extensions = {"json"}
)
public class GuidesTOCImpl extends AbstractComponentImpl implements GuidesTOC {

    protected static final String RESOURCE_TYPE_V1 = "aemguidesDALP/components/sites-components/guides-toc";
    private static final Logger logger = LoggerFactory.getLogger(GuidesTOCImpl.class);
    @Self
    private SlingHttpServletRequest request;
    @ScriptVariable
    private Resource resource;
    @ScriptVariable
    private Page currentPage;
    private String templateName;
    private List<String> guidesNavigation;
    private List<String> guidesNavigation2;
    private String currentPageIndexInToc;
    private String toString;

    public GuidesTOCImpl() {
    }

    @PostConstruct
    private void initModel() {
        try {
            Session session = (Session) this.request.getResourceResolver().adaptTo(Session.class);
            String sitePath = (String) this.currentPage.getContentResource().getValueMap().get("sitePath", String.class);
            logger.info("AEMSITE: sitePath: {}", sitePath);
            Node node = session.getNode(sitePath + "/jcr:content");
            System.out.println(node.getPath());
            logger.info("AEMSITE: nodePath: {}", node.getPath());
            Binary tocBinary = node.getProperty("guides-navigation").getBinary();
            Binary tocIndexBinary = node.getProperty("guides-navigation-index").getBinary();
            String tocBinaryString = IOUtils.toString(tocBinary.getStream(), "UTF-8");
            String tocIndexBinaryString = IOUtils.toString(tocIndexBinary.getStream(), "UTF-8");
            logger.info("AEMSITE: tocBinaryString: {}", tocBinaryString);
            JsonObject finalPathObj = new JsonObject();
            JsonObject pathObj = new Gson().fromJson(tocBinaryString, JsonObject.class);
            String outputPath = pathObj.get("outputPath").getAsString();

            JsonArray childArr = pathObj.get("children").getAsJsonArray();
            finalPathObj.addProperty("displayName", pathObj.get("displayName").getAsString());
            finalPathObj.addProperty("outputPath", outputPath);
            if (childArr.size() > 0) {
                finalPathObj.add("children", getChildrenPath(session, childArr));
            } else {
                finalPathObj.add("children", new JsonArray());
            }
            finalPathObj.addProperty("active", true);
            finalPathObj.addProperty("visible", true);

            logger.info("AEMSITE: tocIndexBinaryString: {}", tocIndexBinaryString);
            JSONObject tocIndexJson = new JSONObject(tocIndexBinaryString);

            try {
                this.currentPageIndexInToc = tocIndexJson.getString(this.currentPage.getPath());
            } catch (Exception var10) {
                logger.warn("AEMSITE: warning: didnt find {} in tocIndexJson", this.currentPage.getPath());
                this.currentPageIndexInToc = "0";
            }

            this.guidesNavigation2 = new ArrayList();
            this.guidesNavigation2.add(finalPathObj.toString());
        } catch (Exception var11) {
            System.out.println("Error: " + var11.getMessage());
            logger.error("AEMSITE: Error: {}", var11.getMessage());
        }

    }

    JsonArray getChildrenPath(Session session, JsonArray childrenArr) {
        JsonArray chArr = new JsonArray();
        childrenArr.forEach(eachObj -> {
            try {
                JsonObject childrenObj = eachObj.getAsJsonObject();
                String outputPath = childrenObj.get("outputPath").getAsString();
                JsonArray childArr = childrenObj.get("children").getAsJsonArray();
                JsonObject obj = new JsonObject();
                if (session.itemExists(outputPath)) {
                    obj.addProperty("displayName", childrenObj.get("displayName").getAsString());
                    obj.addProperty("outputPath", outputPath);
                    if (childArr.size() > 0) {
                        obj.add("children", getChildrenPath(session, childArr));
                    } else {
                        obj.add("children", new JsonArray());
                    }
                    obj.addProperty("active", true);
                    obj.addProperty("visible", true);
                    chArr.add(obj);
                }

            } catch (RepositoryException e) {
                e.printStackTrace();
            }
        });

        return chArr;
    }

    @Override
    public List<String> getGuidesNavigation() {
        return this.guidesNavigation;
    }

    @Override
    public String getCurrentPageTocIndex() {
        return this.currentPageIndexInToc;
    }


    @Override
    public String toString() {
        return "GuidesNavigation2Impl{" +
                "request=" + request +
                ", resource=" + resource +
                ", currentPage=" + currentPage +
                ", templateName='" + templateName + '\'' +
                ", guidesNavigation=" + guidesNavigation +
                ", currentPageIndexInToc='" + currentPageIndexInToc + '\'' +
                '}';
    }

    public  List<String> getGuidesNavigation2(){
        return this.guidesNavigation2;
    }

}
