package com.adobe.guides.dalp.core.models;

import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.adobe.cq.export.json.SlingModelFilter;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;
import com.day.cq.wcm.api.Page;
import com.drew.lang.annotations.NotNull;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.Self;
import org.apache.sling.models.factory.ModelFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.jcr.Node;
import javax.jcr.RepositoryException;
import java.util.Iterator;

@Model(
        adaptables = {SlingHttpServletRequest.class, Resource.class},
        adapters = {GuidesPager.class, ComponentExporter.class},
        resourceType = GuidesPagerImpl.RESOURCE_TYPE
)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class GuidesPagerImpl extends AbstractComponentImpl implements GuidesPager {
    private static final Logger LOGGER = LoggerFactory.getLogger(GuidesPagerImpl.class);

    protected static final String RESOURCE_TYPE = "aemguidesDALP/components/sites-components/guides-pager";

    @ScriptVariable
    private Resource resource;

    @ScriptVariable
    protected com.day.cq.wcm.api.Page currentPage;

    @ScriptVariable
    @JsonIgnore
    protected ResourceResolver resolver;

    @Inject
    private ModelFactory modelFactory;

    @Inject
    private SlingModelFilter slingModelFilter;

    @Self
    private SlingHttpServletRequest request;

    private ListItem prev;
    private ListItem next;

    @PostConstruct
    protected void initModel() {
        prev = findPrev();
        next = findNext(currentPage);
    }

    private boolean shouldSkipPage(Page page) {
        Resource contentResource = page.getContentResource();
        if (contentResource != null) {
            Node contentNode = contentResource.adaptTo(Node.class);
            try {
                return contentNode != null && !contentNode.hasProperty("sourcePath");
            } catch (RepositoryException e) {
                LOGGER.error("Error in Pager components {}", e);
            }
        }
        return false;
    }

    protected ListItem findNext(Page currentPage) {
        Page parent = currentPage.getParent();
        if (currentPage.getDepth() <= 5) {
            // Prevent pager from leaving the book
            // TODO: Push depth into edit dialog
            return null;
        }

        if (parent != null) {
            Iterator<Page> siblings = parent.listChildren();
            while (siblings.hasNext()) {
                Page sibling = siblings.next();
                if (currentPage.getName().equals(sibling.getName())) {
                    boolean hasNext = siblings.hasNext();
                    Page nextPage = null;
                    if(hasNext) {
                        while (siblings.hasNext()) {
                            Page tempNext = siblings.next();
                            if (!shouldSkipPage(tempNext)) {
                                nextPage = tempNext;
                                break;
                            }
                        }
                    }
                    return hasNext && nextPage != null
                            ?   new PageListItemImpl(request, nextPage, "", false, null)
                            : findNext(currentPage.getParent());
                }
            }
        }
        return null;
    }

    protected ListItem findPrev() {
        Page parent = currentPage.getParent();
        if (parent != null) {
            Page prevSibling = null;
            Iterator<Page> siblings = parent.listChildren();
            while (siblings.hasNext()) {
                Page sibling = siblings.next();
                if (prevSibling != null && currentPage.getName().equals(sibling.getName())) {
                    return new PageListItemImpl(request, prevSibling, "", false, null);
                }
                if(!shouldSkipPage(sibling))
                    prevSibling = sibling;
            }
        }
        return null;
    }

    @Override
    public ListItem getPrev() {
        return prev;
    }

    @Override
    public ListItem getNext() {
        return next;
    }

    @NotNull
    @Override
    public String getExportedType() {
        return resource.getResourceType();
    }
}
