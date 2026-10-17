package ovh.miroslaw;

import io.quarkiverse.roq.frontmatter.runtime.model.Page;
import io.quarkiverse.roq.frontmatter.runtime.model.RoqUrl;
import io.quarkus.qute.TemplateExtension;

@TemplateExtension
public class PostImages {

    private static final String THUMBNAIL_SUFFIX = "-small";

    static RoqUrl cover(Page page) {
        if (page == null) {
            return null;
        }
        String image = page.data().getString("image");
        if (image == null || !image.contains(THUMBNAIL_SUFFIX)) {
            return page.image();
        }
        String full = image.replace(THUMBNAIL_SUFFIX, "");
        return page.imageExists(full) ? page.image(full) : page.image();
    }
}
