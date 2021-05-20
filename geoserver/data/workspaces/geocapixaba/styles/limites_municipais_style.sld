<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0"
  xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.0.0/StyledLayerDescriptor.xsd"
  xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc"
  xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <NamedLayer>
    <Name>abastecimento_urbano_agua_style</Name>
    <UserStyle>
      <Title>A light red polygon style</Title>
      <FeatureTypeStyle>
        <Rule>
          <Title>light red polygon</Title>
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#E9C3F3</CssParameter>
              <CssParameter name="opacity">0.25</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#00000</CssParameter>
              <CssParameter name="stroke-width">0.5</CssParameter>
          
            </Stroke>
          </PolygonSymbolizer>

        </Rule>

      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>