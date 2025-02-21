package com.adobe.guides.dalp.core.models;

import com.day.cq.wcm.api.components.Component;
import com.adobe.cq.wcm.core.components.models.ListItem;
import com.adobe.cq.wcm.core.components.models.datalayer.ComponentData;
import com.adobe.cq.wcm.core.components.models.datalayer.builder.DataLayerBuilder;
import com.adobe.cq.wcm.core.components.util.AbstractComponentImpl;
import com.adobe.cq.wcm.core.components.util.ComponentUtils;
import com.drew.lang.annotations.NotNull;
import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.resource.Resource;

import java.util.Optional;

public abstract class AbstractListItemImpl extends AbstractComponentImpl implements ListItem {

    /**
     * Prefix prepended to the item ID.
     */
    private static final String ITEM_ID_PREFIX = "item";

    /**
     * The ID of the component that contains this list item.
     */
    protected String parentId;

    /**
     * The path of this list item.
     */
    protected String path;

    /**
     * Data layer type.
     */
    protected String dataLayerType;

    /**
     * Construct a list item.
     *
     * @param parentId The ID of the containing component.
     * @param resource The resource of the list item.
     * @param component The component that contains this list item.
     */
    protected AbstractListItemImpl(String parentId, Resource resource, Component component) {
        this.parentId = parentId;
        if (resource != null) {
            this.path = resource.getPath();
        }
        if (component != null) {
            this.dataLayerType = component.getResourceType() + "/" + ITEM_ID_PREFIX;
        }
        this.resource = resource;
    }

    @NotNull
    @Override
    public String getId() {
        return ComponentUtils.generateId(StringUtils.join(parentId, ComponentUtils.ID_SEPARATOR, ITEM_ID_PREFIX), path);
    }

    @NotNull
    @Override
    protected ComponentData getComponentData() {
        return DataLayerBuilder.extending(super.getComponentData())
                .asComponent()
                .withType(() -> Optional.ofNullable(this.dataLayerType).orElseGet(() -> super.getComponentData().getType()))
                .withTitle(this::getTitle)
                .withLinkUrl(this::getURL)
                .build();
    }

}

