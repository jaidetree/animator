# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'compass' do
  watch('^(.*)\.s[ac]ss')
end

guard 'livereload' do
  watch(%r{(.*(.+\.(css|js|html))).*})
end

# Add files and commands to this file, like the example:
#   watch(%r{file/path}) { `command(s)` }
#
guard 'shell' do
  watch(/(.*).txt/) {|m| `tail #{m[0]}` }
end
