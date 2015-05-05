require 'nokogiri'

module Jekyll
  module TOCGenerator
  	TOGGLE_HTML = '<h2><div id="gen-toctitle" class="caret2 hide">%1</div>%2</h2>'
    TOC_CONTAINER_HTML = '<div id="gen-toc-container"><div class="gen-toc" id="gen-toc"><div class="gen-toc-title hide">%1</div><ul class="nav sidebar-nav">%2</ul></div></div>'
    HIDE_HTML = '<span class="gen-toctoggle">[<a id="gen-toctogglelink" class="internal" href="#">%1</a>]</span>'

   def toc_generate(html)
        # No Toc can be specified on every single page
        # For example the index page has no table of contents
        no_toc = @context.environments.first["page"]["noToc"] || false;

        if no_toc
            return ''
        end

        config = @context.registers[:site].config
        # Minimum number of items needed to show TOC, default 0 (0 means no minimum)
        min_items_to_show_toc = config["minItemsToShowToc"] || 0

        anchor_prefix = config["anchorPrefix"] || 'tocAnchor-'

        # Text labels

        doc = Nokogiri::HTML(html)
        page_title = @context.environments.first["page"]["title"];
        contents_label = page_title || 'Contents'
        hide_label = config["hideLabel"] || 'hide'
        show_label = config["showLabel"] || 'show'
        show_toggle_button = config["showToggleButton"]

        toc_html = ''
        toc_level = 1
        toc_section = 1
        item_number = 1
        level_html = ''


        # Find H1 tag and all its H2 siblings until next H1
        doc.css('h2').each do |h2|
            # TODO This XPATH expression can greatly improved
            ct  = h2.xpath('count(following-sibling::h2)')
            h3s = h2.xpath("following-sibling::h3[count(following-sibling::h2)=#{ct}]")

            level_html = '';
            inner_section = 0;

            h3s.map.each do |h3|
                inner_section += 1;
                #anchor_id = anchor_prefix + toc_level.to_s + '-' + toc_section.to_s + '-' + inner_section.to_s
                anchor_id = h3.attribute('id') # + '-' + toc_level.to_s + '-' + toc_section.to_s + '-' + inner_section.to_s
                h3['id'] = "#{anchor_id}"

                level_html += create_level_html(anchor_id,
                    toc_level + 1,
                    toc_section + inner_section,
                    item_number.to_s + '.' + inner_section.to_s,
                    h3.text,
                    '')
            end
            if level_html.length > 0
                level_html = '<ul class="closed">' + level_html + '</ul>';
            end
            #anchor_id = anchor_prefix + toc_level.to_s + '-' + toc_section.to_s;
            anchor_id = h2.attribute('id')  #+ '-' + toc_level.to_s + '-' + toc_section.to_s + '-' + inner_section.to_s
            h2['id'] = "#{anchor_id}"

            toc_html += create_level_html(anchor_id,
                toc_level,
                toc_section,
                item_number,
                h2.text,
                level_html);

            toc_section += 1 + inner_section;
            item_number += 1;
        end

        # for convenience item_number starts from 1
        # so we decrement it to obtain the index count
        toc_index_count = item_number - 1

        if toc_html.length > 0
            hide_html = '';
            if (show_toggle_button)
                hide_html = HIDE_HTML.gsub('%1', hide_label)
            end

            if min_items_to_show_toc <= toc_index_count
                replaced_toggle_html = TOGGLE_HTML
                    .gsub('%1', contents_label)
                    .gsub('%2', hide_html);
                toc_table = TOC_CONTAINER_HTML
                    .gsub('%1', replaced_toggle_html)
                    .gsub('%2', toc_html);
                doc.css('body').children.before(toc_table)
            end
            toc_table
            #doc.css('body').children.to_html
        # else
        #     return html
        end
   end

private

    def create_level_html(anchor_id, toc_level, toc_section, tocNumber, tocText, tocInner)
        link = '<a href="#%1"><span class="gen-toctext">%3</span></a>%4'
            .gsub('%1', anchor_id.to_s)
            .gsub('%2', tocNumber.to_s)
            .gsub('%3', tocText)
            .gsub('%4', tocInner ? tocInner : '');
        '<li class="gen-toc_level-%1 toc_section-%2">%3</li>'
            .gsub('%1', toc_level.to_s)
            .gsub('%2', toc_section.to_s)
            .gsub('%3', link)
    end
  end
end

Liquid::Template.register_filter(Jekyll::TOCGenerator)