import base64
import re

with open('resources/style.scss', 'r') as file:
	content = file.read()

# Not necessary for now
# def convert_font_path(match):
# 	font_name = match.group(1).strip('"')
# 	print("converting font: "+font_name)
# 	base_url = "https://cognigy-bucket.s3.eu-west-3.amazonaws.com/prod/webchat/Edenred/fonts"
# 	return f"url('{base_url + font_name}')"

# content = re.sub(r'url\(./fonts(.*?)\)', convert_font_path, content)

def convert_image(match):
	url = match.group(1).strip('"')
	print("converting image: "+url)
	if 'data:image' in url:
		return match.group(0)
	else:
		print("converting: "+url)
		image_type = re.search(r'\.(png|jpg|jpeg|gif|svg)', url).group(1)
		if image_type == 'svg':
			with open(url, 'rb') as image_file:
				encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
				return f"url('data:image/svg+xml;charset=utf-8;base64,{encoded_image}')"
		else:
			with open(url, 'rb') as image_file:
				encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
				return f"url('data:image/{image_type};base64,{encoded_image}')"

new_content = re.sub(r'url\((.*?)\)', convert_image, content)

with open('resources/style-2.scss', 'w') as file:
	file.write(new_content)
