import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("couldn't get cabins ");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("couldn't delete cabins ");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);
  const hasImagepath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin?.image?.name}`.replaceAll(
    "/",
    ""
  );

  //https://vgxuarxkrhkltclnfpbf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imagePath = hasImagepath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  console.log(hasImagepath, imageName, imagePath);
  //create/edit the cabin
  let query = supabase.from("cabins");

  //1.)create a new cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //2.) edit a cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("couldn't create a cabin ");
  }

  //upload the image
  if (hasImagepath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin Image could not be uploaded and the cabin was not created!"
    );
  }
  return data;
}
